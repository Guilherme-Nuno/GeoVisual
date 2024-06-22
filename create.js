import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { findMaxPoints, rotateToPlane } from './calculations.js';
import { draw2dPlane, draw3dPlane } from './draw.js';

const lineNamesList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const planeNamesList = ['⍺', '⍵', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export function createPoint(coordinateX, coordinateY, coordinateZ, pointName){
    // Creates geometry, Material and the mesh
    const pointGeometry = new THREE.SphereGeometry(0.1,12);
    const pointMaterial = new THREE.MeshBasicMaterial( {color: 'black'} );
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    const groupPoint = new THREE.Group();

    // Adds name and new parameters
    point.geoType = "Point";
    point.name = pointName;
    point.onVerticalPlane = "false";
    point.onHorizontalPlane = "false";
    
    if (coordinateZ == 0) {
        point.onVerticalPlane = "true";
    }
    
    if (coordinateY == 0) {
        point.onHorizontalPlane = "true";
    }

    // Sets position
    point.position.set( coordinateX, coordinateY, coordinateZ);

    draw3dPlane(point);
    draw2dPlane(point);

    return point;
}

export function createLine(point1, point2, lineName = "null"){
    
    let point1Position, point2Position;
    // Creates geometry, Material and the mesh
    if (point1.geoType == "Point") {
        point1Position = point1.position.clone();    
    } else {
        point1Position = point1.clone();    
    }

    if (point2.geoType == "Point") {
        point2Position = point2.position.clone();    
    } else {
        point2Position = point2.clone();    
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(findMaxPoints(point1Position, point2Position));
    const lineMaterial = new THREE.LineBasicMaterial( {color: 'black'} );
    const line = new THREE.LineSegments(lineGeometry, lineMaterial);

    if (lineName == "null") {
        lineName = lineNamesList.shift();
    } else {
        const indexName = lineNamesList.findIndex(name => name === lineName);
        if (indexName == -1) {
            lineName = lineNamesList.shift();
        } else {
            lineNamesList.splice(indexName, 1);
        }
    }

    // Adds name and new parameters geo
    line.geoType = "Line";
    line.name = lineName;
    line.geoParent = [];
    line.geoChild = [point1, point2];
    line.geoPointF = "false";
    line.geoPointH = "false";
    line.geoParalelVerticalPlane = "false";
    line.geoParalelHorizontalPlane = "false";

    draw3dPlane(line);
    draw2dPlane(line);

    return line;
}

export function createPlane(planeName, object1, object2, object3 = 'null'){
    let line1;
    let line2;

    const groupPlane = new THREE.Group();

    // Check input args and create lines 
    if (object2.geoType == 'Line') {
        line1 = object1.clone();
        line2 = object2.clone();
    } else if (object3 == 'null'){
        line1 = object1.clone();
        line2 = createLine( object1.position.clone(), object2.position.clone()); //Problem Line position
    } else {
        line1 = createLine( object1.position.clone(), object2.position.clone());
        line2 = createLine( object1.position.clone(), object3.position.clone());
    }

    // Calculate normal of plane
    const line1Point1 = new THREE.Vector3().fromBufferAttribute(line1.geometry.attributes.position, 0);
    const line1Point2 = new THREE.Vector3().fromBufferAttribute(line1.geometry.attributes.position, 1);
    const line2Point1 = new THREE.Vector3().fromBufferAttribute(line2.geometry.attributes.position, 0);
    const line2Point2 = new THREE.Vector3().fromBufferAttribute(line2.geometry.attributes.position, 1);

    const line1Normal = new THREE.Vector3().subVectors(line1Point1, line1Point2);
    const line2Normal = new THREE.Vector3().subVectors(line2Point1, line2Point2);

    let planeNormal;

    if (line1Normal.x == 0 && line1Normal.y == 0 && line1Normal.z == 0) {

        if (line2Normal.x == 0 && line2Normal.y == 0 && line2Normal.z == 0) {
            planeNormal = new THREE.Vector3().crossVectors(line1Point1, line2Point1).normalize();
        } else {
        planeNormal = new THREE.Vector3().crossVectors(line1Point1, line2Normal).normalize();
        }

    } else {

        if (line2Normal.x == 0 && line2Normal.y == 0 && line2Normal.z == 0) {
            planeNormal = new THREE.Vector3().crossVectors(line1Normal, line2Point1).normalize();
        } else {
        planeNormal = new THREE.Vector3().crossVectors(line1Normal, line2Normal).normalize();
        }
    }

    // Create plane geometry, rotate and translate plane to the real position
    const geometryPlane = new THREE.PlaneGeometry(30, 30);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), planeNormal);

    geometryPlane.applyQuaternion(quaternion);

    // Find the median point of the plane
    let medX = (line1Point1.x + line1Point2.x + line2Point1.x + line2Point2.x) / 4;
    let medY = (line1Point1.y + line1Point2.y + line2Point1.y + line2Point2.y) / 4;
    let medZ = (line1Point1.z + line1Point2.z + line2Point1.z + line2Point2.z) / 4;

    geometryPlane.translate(medX, medY, medZ);

    // Add material and mesh
    const materialPlane = new THREE.MeshBasicMaterial( {color: 'aquamarine', side: THREE.DoubleSide, opacity: 0.3, transparent: true, depthWrite: false} );
    const plane = new THREE.Mesh( geometryPlane, materialPlane);

    plane.geoType = "Plane";
    plane.name = planeName;
    plane.geoChild = [line1, line2];
    plane.geoQuaternion = quaternion;


    draw2dPlane(plane);
    draw3dPlane(plane);

    return plane;
}

export function createTextLabel(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '24px Arial';
    context.fillStyle = 'black';
    context.fillText(text, 0, 24);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(3, 3, 1); 
    sprite.position.copy(position);
    sprite.translateX(1);
    sprite.translateY(-1);

    return sprite;
}

function createShapeGeometry( sideSize, sides ) {
    const radius = sideSize / (2 * Math.sin(Math.PI / sides));
    
    const shape = new THREE.CircleGeometry(radius, sides);
    const shapeGeometry = new THREE.EdgesGeometry(shape);

    return shapeGeometry;
}

export function createShape( sideSize, sides, position, plane ) {
    
    const shapeGeometry = createShapeGeometry( sideSize, sides );

    rotateToPlane( shapeGeometry, plane );
    shapeGeometry.translate( position.x, position.y, position.z );
    
    const shapeEdges = new THREE.EdgesGeometry( shapeGeometry );
    const shape = new THREE.LineSegments( shapeEdges, new THREE.LineBasicMaterial( { color: 'black' } ) );

    shape.geoType = 'Shape';

    return shape;
}