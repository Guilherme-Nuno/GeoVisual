import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { createLine, createLineSegment, createPoint, createTextLabel } from './create.js';
import { scene2d, scene3d, horizontalPlane, verticalPlane } from './main.js';
import { intersection, findMaxPoints } from './calculations.js';

const LINECOLOR = 'black';

export function draw3dPlane (object){
    const group3d = new THREE.Group();

    switch (object.geoType) {
        case "Point":
            const point = object.clone();
            point.geoType = object.geoType;
            group3d.add(point);

            const label3Dpoint = createTextLabel(point.name, point.position);
            group3d.add(label3Dpoint);
            break;
        case "Line":
            const line = object.clone();
            line.geoType = object.geoType;
            line.geoChild = object.geoChild;
            group3d.add(line);
            break;
        case "Plane":
            const plane = object.clone();
            group3d.add(plane);
            break;
        case "Shape":
            for (let i = 0; i < object.geoVertices.length; i++) {
                // This will create points on the 2d Plane
                group3d.add(createPoint(object.geoVertices[i].x, object.geoVertices[i].y, object.geoVertices[i].z));
            }
            const shape = object.clone();

            group3d.add(shape);
            break;
        default:
            break;
    }
    group3d.geoParent = object;

    scene3d.add(group3d);

    return group3d;
}

/**
 * Creates the various drawings for the representation of an object on the diedric projection
 * @param {any} object 
 */
export function draw2dPlane ( object ) {
    const verticesVertical = [];
    const verticesHorizontal = [];

    const group2d = new THREE.Group();

    if (object.geoType == "Line" || object.geoType == 'LineSegment') {

        for (let index = 0; index < object.geometry.attributes.position.count; index++) {
            verticesVertical[index] = new THREE.Vector3().fromBufferAttribute(object.geometry.attributes.position, index);
            verticesHorizontal[index] = new THREE.Vector3().fromBufferAttribute(object.geometry.attributes.position, index);
        }

    } else if (object.geoType == 'Shape') {
        
        for (let index = 0; index < object.geoVertices.length; index++) {
            verticesVertical[index] = object.geoVertices[index].clone();
            verticesHorizontal[index] = object.geoVertices[index].clone();
        }

    } else {  
        verticesVertical[0] = object.position.clone();
        verticesHorizontal[0] = object.position.clone();
    }

    // Transform z coordinates into y coordinates to be represented on the diedric projection
    for (let index = 0; index < verticesVertical.length; index++) {
        verticesVertical[index].z = 0;
    }

    for (let index = 0; index < verticesHorizontal.length; index++) {
        verticesHorizontal[index].y = 0 - verticesHorizontal[index].z;
        verticesHorizontal[index].z = 0;
    }

    switch (object.geoType) {
        case "Line":
            const lineVertical = createBasicLineSegments(verticesVertical, LINECOLOR);
            const lineHorizontal = createBasicLineSegments(verticesHorizontal, LINECOLOR);
    
            group2d.add(lineVertical);
            group2d.add(lineHorizontal);
    
            // Adicionar texto para linhas
            const labelVertical1 = createTextLabel(object.name + '2', verticesVertical[0]);
            const labelHorizontal1 = createTextLabel(object.name + '1', verticesHorizontal[0]);

            group2d.add(labelVertical1);
            group2d.add(labelHorizontal1);
            break;

        case "LineSegment":
            const lineSegmentVertical = createBasicLineSegments(verticesVertical, LINECOLOR);
            const lineSegmentHorizontal = createBasicLineSegments(verticesHorizontal, LINECOLOR);

            group2d.add(lineSegmentVertical);
            group2d.add(lineSegmentHorizontal);
            break;

        case "Point":
            verticesVertical[1] = new THREE.Vector3(verticesVertical[0].x, 0, 0);
            verticesHorizontal[1] = new THREE.Vector3(verticesHorizontal[0].x, 0, 0);
    
            const pointLineVertical = createBasicLineSegments(verticesVertical, 'gray');
            const pointLineHorizontal = createBasicLineSegments(verticesHorizontal, 'gray');

            group2d.add(pointLineVertical);
            group2d.add(pointLineHorizontal);
    
            const perpendicularOffset = 0.1;
            const horizontalOffset = 0.06;
    
            // Adicionar linhas perpendiculares para a linha vertical
            const perpLineVerticalArray = [
                new THREE.Vector3(verticesVertical[0].x - perpendicularOffset, verticesVertical[0].y - horizontalOffset, verticesVertical[0].z),
                new THREE.Vector3(verticesVertical[0].x + perpendicularOffset, verticesVertical[0].y + horizontalOffset, verticesVertical[0].z)
            ];

            const perpLineVertical1 = createBasicLineSegments( perpLineVerticalArray, LINECOLOR);

            group2d.add(perpLineVertical1);
    
            // Adicionar linhas perpendiculares para a linha horizontal
            const perpLineHorizontalArray = [
                new THREE.Vector3(verticesHorizontal[0].x - perpendicularOffset, verticesHorizontal[0].y - horizontalOffset, verticesHorizontal[0].z),
                new THREE.Vector3(verticesHorizontal[0].x + perpendicularOffset, verticesHorizontal[0].y + horizontalOffset, verticesHorizontal[0].z)
            ];

            const perpLineHorizontal1 = createBasicLineSegments( perpLineHorizontalArray, LINECOLOR);

            group2d.add(perpLineHorizontal1);
    
            // Adicionar texto para pontos
            const pointLabelVertical = createTextLabel(object.name + '2', verticesVertical[0]);
            const pointLabelHorizontal = createTextLabel(object.name + '1', verticesHorizontal[0]);

            group2d.add(pointLabelVertical);
            group2d.add(pointLabelHorizontal);
            break;

        case "Plane":
            const line1HorizontalPoint = intersection(object.geoChild[0], horizontalPlane);
            const line1VerticalPoint = intersection(object.geoChild[0], verticalPlane);

            const line2HorizontalPoint = intersection(object.geoChild[1], horizontalPlane);
            const line2VerticalPoint = intersection(object.geoChild[1], verticalPlane);

            let planeHorizontalLine, planeVerticalLine;

            let xIntersectionPoint;

            // Use points to draw Plane projections
            if (line1HorizontalPoint != null && line2HorizontalPoint != null) {

                const line1HorizontalPoint2d = line1HorizontalPoint.clone();
                line1HorizontalPoint2d.y = 0 - line1HorizontalPoint2d.z;
                line1HorizontalPoint2d.z = 0;

                const line2HorizontalPoint2d = line2HorizontalPoint.clone();
                line2HorizontalPoint2d.y = 0 - line2HorizontalPoint2d.z;
                line2HorizontalPoint2d.z = 0;

                planeHorizontalLine = createBasicLineSegments( findMaxPoints(line1HorizontalPoint2d, line2HorizontalPoint2d), LINECOLOR);

                group2d.add(planeHorizontalLine);

                const planeLabelHorizontal = createTextLabel('h' + object.name, new THREE.Vector3().fromBufferAttribute(planeHorizontalLine.geometry.attributes.position, 0));

                group2d.add(planeLabelHorizontal);
            }

            if (line1VerticalPoint != null && line2VerticalPoint != null) {

                planeVerticalLine = createBasicLineSegments( findMaxPoints(line1VerticalPoint, line2VerticalPoint), LINECOLOR);

                group2d.add(planeVerticalLine);

                const planeLabelVertical = createTextLabel('f' + object.name, new THREE.Vector3().fromBufferAttribute(planeVerticalLine.geometry.attributes.position, 0));
            
                group2d.add(planeLabelVertical);
            }

            // Test to see if both lines were created
            if (planeHorizontalLine != undefined || planeVerticalLine != undefined) {
                if (planeHorizontalLine == undefined) {
                    if (line1HorizontalPoint != null){
                        xIntersectionPoint = intersection(planeVerticalLine, horizontalPlane);

                        const line1HorizontalPoint2d = line1HorizontalPoint.clone();
                        line1HorizontalPoint2d.y = 0 - line1HorizontalPoint2d.z;
                        line1HorizontalPoint2d.z = 0;

                        planeHorizontalLine = createBasicLineSegments(findMaxPoints(line1HorizontalPoint2d, xIntersectionPoint), LINECOLOR);

                        group2d.add(planeHorizontalLine);

                        const planeLabelHorizontal = createTextLabel('h' + object.name, new THREE.Vector3().fromBufferAttribute(planeHorizontalLine.geometry.attributes.position, 0));

                        group2d.add(planeLabelHorizontal);
                    } else  if (line2HorizontalPoint != null) {
                        xIntersectionPoint = intersection(planeVerticalLine, horizontalPlane);

                        const line2HorizontalPoint2d = line2HorizontalPoint.clone();
                        line2HorizontalPoint2d.y = 0 - line2HorizontalPoint2d.z;
                        line2HorizontalPoint2d.z = 0;

                        planeHorizontalLine = createBasicLineSegments(findMaxPoints(line2HorizontalPoint2d, xIntersectionPoint), LINECOLOR);

                        group2d.add(planeHorizontalLine);

                        const planeLabelHorizontal = createTextLabel('h' + object.name, new THREE.Vector3().fromBufferAttribute(planeHorizontalLine.geometry.attributes.position, 0));

                        group2d.add(planeLabelHorizontal);
                    }
                } else {
                    if (line1VerticalPoint != null) {
                        xIntersectionPoint = intersection(planeHorizontalLine, horizontalPlane);

                        planeVerticalLine = createBasicLineSegments(findMaxPoints(line1VerticalPoint, xIntersectionPoint), LINECOLOR);

                        group2d.add(planeVerticalLine);

                        const planeLabelVertical = createTextLabel('f' + object.name, new THREE.Vector3().fromBufferAttribute(planeVerticalLine.geometry.attributes.position, 0));
                    
                        group2d.add(planeLabelVertical);
                    } else if (line2VerticalPoint != null) {
                        xIntersectionPoint = intersection(planeHorizontalLine, horizontalPlane);

                        planeVerticalLine = createBasicLineSegments(findMaxPoints(line2VerticalPoint, xIntersectionPoint), LINECOLOR);

                        group2d.add(planeVerticalLine);

                        const planeLabelVertical = createTextLabel('f' + object.name, new THREE.Vector3().fromBufferAttribute(planeVerticalLine.geometry.attributes.position, 0));
                    
                        group2d.add(planeLabelVertical);
                    }
                }
            }
        break;

        case "Shape":

            for (let i = 0; i < verticesVertical.length - 1; i++) {
                group2d.add(createLineSegment(verticesVertical[i], verticesVertical[i + 1]));
    
                if (i == verticesVertical.length - 2) {
                    group2d.add(createLineSegment(verticesVertical[i + 1], verticesVertical[0]));
                }
            }

            for (let i = 0; i < verticesHorizontal.length - 1; i++) {
                group2d.add(createLineSegment(verticesHorizontal[i], verticesHorizontal[i + 1]));
    
                if (i == verticesHorizontal.length - 2) {
                    group2d.add(createLineSegment(verticesHorizontal[i + 1], verticesHorizontal[0]));
                }
            }

            break;
    
        default:
            break;
    }

    group2d.geoParent = object;

    scene2d.add(group2d);

    return group2d;
}

/**
 * Creates a basic line segments object with a basic color
 * @param {Array} points 
 * @param {string} lineColor 
 * @returns THREE.LineSegments
 */
function createBasicLineSegments( points, lineColor ) {
    const line = new THREE.BufferGeometry().setFromPoints( points );
    const color = new THREE.LineBasicMaterial( {color: lineColor} );
    const lineMesh = new THREE.LineSegments( line, color );

    return lineMesh;
}