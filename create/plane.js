import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { draw2dPlane } from '../draw/draw2D.js';
import { draw3dPlane } from '../draw/draw3D.js';
import { createLine } from './line.js';
import { existingPlaneList, planeNamesList } from '../utils/nameLists.js';

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