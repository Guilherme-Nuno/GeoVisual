import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { draw2dPlane } from '../draw/draw2D.js';
import { draw3dPlane } from '../draw/draw3D.js';
import { existingPointList, pointNamesList } from '../utils/nameLists.js';


export function createPoint(coordinateX, coordinateY, coordinateZ, pointName, draw = true){
    // Creates geometry, Material and the mesh
    const pointGeometry = new THREE.SphereGeometry(0.1,12);
    const pointMaterial = new THREE.MeshBasicMaterial( {color: 'black'} );
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    // Adds name and new parameters
    if (pointName == undefined) {
        pointName = '';
    }

    if (draw) {
        const indexName = pointNamesList.findIndex(name => name === pointName);
        if (indexName != -1) {
            pointNamesList.splice(indexName, 1);
        } else if (!(pointName.startsWith('H') || pointName.startsWith('F') || pointName.startsWith('I') || pointName.startsWith('Q'))) {
            pointName = pointNamesList.shift();
        } 
        existingPointList.push(pointName);
    }

    const groupPoint = new THREE.Group();

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