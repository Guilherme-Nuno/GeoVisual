import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { findMaxPoints } from '../utils/calculations.js';
import { draw2dPlane } from '../draw/draw2D.js';
import { draw3dPlane } from '../draw/draw3D.js';
import { lineNamesList, existingLineList } from '../utils/nameLists.js';

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
        const indexName =lineNamesList.findIndex(name => name === lineName);
        if (indexName == -1) {
            lineName = lineNamesList.shift();
        } else {
            lineNamesList.splice(indexName, 1);
        }
        existingLineList.push(lineName);
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