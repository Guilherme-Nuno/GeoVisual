import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { cage } from '../main.js';

export function intersection(line, object) {
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3().subVectors(
                      new THREE.Vector3().fromBufferAttribute(line.geometry.attributes.position, 1), 
                      new THREE.Vector3().fromBufferAttribute(line.geometry.attributes.position, 0));
    direction.normalize();

    const origin = new THREE.Vector3(
                   line.geometry.attributes.position.array[0], 
                   line.geometry.attributes.position.array[1], 
                   line.geometry.attributes.position.array[2]);
    raycaster.set(origin, direction);

    const intersects = raycaster.intersectObject(object);

    return intersects.length > 0 ? intersects[0].point : null;
}

export function findMaxPoints(point1, point2){
    const direction1 = point2.clone();
    direction1.sub(point1);
    direction1.normalize();
    const direction2 = point1.clone();
    direction2.sub(point2);
    direction2.normalize();

    const raycaster1 = new THREE.Raycaster(point1, direction1);
    const intersect1 = raycaster1.intersectObject(cage);
    const raycaster2 = new THREE.Raycaster(point2, direction2);
    const intersect2 = raycaster2.intersectObject(cage);

    const maxPoint1 = intersect1[0].point.clone();
    const maxPoint2 = intersect2[0].point.clone();

    const maxPoints = [maxPoint1, maxPoint2];

    return maxPoints;
}

export function rotateToPlane(shape, plane){
    const quaternion = plane.geoQuaternion.clone();

    shape.applyQuaternion( quaternion );

    return shape;
}

/**
 * 
 * @param {THREE.LineSegments} shape 
 * @returns {THREE.Vector3[]}
 */
export function findVertices( shape ){
    const shapeVertices = []; 

    for (let i = 0; i < shape.geometry.attributes.position.count ; i++) {
        let positionVector = new THREE.Vector3().fromBufferAttribute( shape.geometry.attributes.position, i);

        if (i == 0){
            shapeVertices.push(positionVector);
        } else {
            let exists = false;

            for (let i = 0; i < shapeVertices.length; i++) {
                if (shapeVertices[i].equals(positionVector)) {
                    exists = true;
                    break;
                } 
            }

            if (!exists) {
                shapeVertices.push(positionVector);
            }
        }
    }

    return shapeVertices;
}

export function findDeviationFromAngle(deviationX, angle) {
    const oposingAngle = 90 - angle;
    const deviationZ = ( deviationX * Math.sin(toRad(angle)) ) / Math.sin(toRad(oposingAngle));

    return deviationZ;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}