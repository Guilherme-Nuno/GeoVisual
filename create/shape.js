import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { findVertices, rotateToPlane } from '../utils/calculations.js';
import { draw2dPlane } from '../draw/draw2D.js';
import { draw3dPlane } from '../draw/draw3D.js';

/**
 * Creates a Shape made of line segments with a defined number of sides and size.
 * @param {number} sideSize 
 * @param {number} sides 
 * @param {THREE.Vector3} position 
 * @param {THREE.Plane} plane 
 * @returns {THREE.LineSegments}
 */
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

    return shape;
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