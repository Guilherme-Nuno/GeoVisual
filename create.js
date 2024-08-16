import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { findMaxPoints, findVertices, rotateToPlane } from './calculations.js';
import { draw2dPlane, draw3dPlane } from './draw.js';
import { scene3d } from './main.js';

export const pointNamesList = ['A', 'B', 'C', 'D', 'E', 'G', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export const existingPointList = [];
export const lineNamesList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
export const existingLineList = [];
export const planeNamesList = [
    'α', // Alfa
    'β', // Beta
    'γ', // Gama
    'δ', // Delta
    'ε', // Epsilon
    'ζ', // Zeta
    'η', // Eta
    'θ', // Teta
    'ι', // Iota
    'κ', // Kappa
    'λ', // Lambda
    'μ', // Mu
    'ν', // Nu
    'ξ', // Xi
    'ο', // Omicron
    'π', // Pi
    'ρ', // Rho
    'σ', // Sigma
    'τ', // Tau
    'υ', // Upsilon
    'φ', // Phi
    'χ', // Chi
    'ψ', // Psi
    'ω'  // Omega
  ];
export const existingPlaneList = [];

export function createPoint(coordinateX, coordinateY, coordinateZ, pointName, draw = true){
    // Creates geometry, Material and the mesh
    const pointGeometry = new THREE.SphereGeometry(0.1,12);
    const pointMaterial = new THREE.MeshBasicMaterial( {color: 'black'} );
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    if (draw) {
        const indexName = pointNamesList.findIndex(name => name === pointName);
        if (indexName != -1) {
            pointNamesList.splice(indexName, 1);
        } else if (!(pointName.startsWith('H') || pointName.startsWith('F') || pointName.startsWith('I') || pointName.startsWith('Q'))) {
            pointName = pointNamesList.shift();
        } 
        existingPointList.push(lineName);
    }

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

    if (draw){
        draw3dPlane(point);
        draw2dPlane(point);
    }

    return point;
}

export function createLine(point1, point2, lineName = "", draw = true){
    
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

    if (draw) {
        const indexName =linetNamesList.findIndex(name => name === lineName);
        if (indexName == -1) {
            lineName = lineNamesList.shift();
        } else {
            lineNamesList.splice(indexName, 1);
        }
        existingLineList.push(pointName);
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

    if ( draw ){
        draw3dPlane(line);
        draw2dPlane(line);
    }

    return line;
}

export function createPlane(object1, object2, object3 = '', planeName = '', draw = true){
    let line1;
    let line2;

    const groupPlane = new THREE.Group();

    // Check input args and create lines 
    if (object2.geoType == 'Line') {
        line1 = object1.clone();
        line2 = object2.clone();
    } else if (object3 == ''){
        line1 = object1.clone();
        line2 = createLine( object1.position.clone(), object2.position.clone()); //Problem Line position
    } else {
        line1 = createLine( object1.position.clone(), object2.position.clone(), "" , false);
        line2 = createLine( object1.position.clone(), object3.position.clone(), "" , false);
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

    if (draw) {
        if (planeName == "") {
            planeName = planeNamesList.shift();
        } else {
            const indexName = planeNamesList.findIndex(name => name === planeName);
            if (indexName == -1) {
                planeName = planeNamesList.shift();
            } else {
                planeNamesList.splice(indexName, 1);
            }
        }
        existingPlaneList.push(planeName);
    }


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

function createShapeGeometry( sideSize, sides, length ) {

    const radius = sideSize / (2 * Math.sin(Math.PI / sides));

    if (length == null) {
        const shape = new THREE.CircleGeometry(radius, sides);

        return shape;
        
    } else {
        const shape = new THREE.CylinderGeometry( radius, radius, length, sides);

        return shape;
    }
}

export function createShape( sideSize, sides, position, plane ) {
    
    const shapeGeometry = createShapeGeometry( sideSize, sides );
    

    rotateToPlane( shapeGeometry, plane );
    shapeGeometry.translate( position.x, position.y, position.z );

    const shapeEdges = new THREE.EdgesGeometry( shapeGeometry );
    const shape = new THREE.LineSegments( shapeEdges, new THREE.LineBasicMaterial( { color: 'black' } ) );

    shape.geoVertices = findVertices( shape );
    shape.geoType = 'Shape';

    draw3dPlane(shape);
    draw2dPlane(shape);

    scene3d.add(shape);

    return shape;
}

export function createLineSegment( point1, point2 ){
    const tempPoint1 = point1.clone();
    const tempPoint2 = point2.clone();

    const lineSegmentGeometry = new THREE.BufferGeometry().setFromPoints( [tempPoint1, tempPoint2] );
    const lineSegment = new THREE.LineSegments(lineSegmentGeometry, new THREE.LineBasicMaterial( {color: 'black' } ) );

    lineSegment.geoType = 'LineSegment';

    draw3dPlane(lineSegment);
    draw2dPlane(lineSegment);

    return lineSegment;
}

export function createSolid( sideSize, sides, position, plane, length){
    
}