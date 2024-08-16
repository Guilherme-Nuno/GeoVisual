import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { createLine, createLineSegment, createPoint, createTextLabel } from './create.js';
import { scene2d, scene3d, horizontalPlane, verticalPlane } from './main.js';
import { intersection, findMaxPoints } from './calculations.js';

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
            group3d.add(line);
            break;
        case "Plane":
            const plane = object.clone();
            group3d.add(plane);
            break;
        case "Shape":
            for (let i = 0; i < object.geoVertices.length; i++) {
                group3d.add(createPoint(object.geoVertices[i].x, object.geoVertices[i].y, object.geoVertices[i].z));
            }
            
            for (let i = 0; i < object.geoVertices.length - 1; i++) {
                group3d.add(createLineSegment(object.geoVertices[i], object.geoVertices[i + 1]));

                if (i == object.geoVertices.length - 2) {
                    group3d.add(createLineSegment(object.geoVertices[i + 1], object.geoVertices[0]));
                }
            }
            break;
        default:
            break;
    }
    group3d.geoParent = object;

    scene3d.add(group3d);

    return group3d;
}

// Creates the various drawings for the representation of an object on the diedric projection
export function draw2dPlane ( object ) {
    const verticesVertical = [];
    const verticesHorizontal = [];

    const group2d = new THREE.Group();

    if (object.geoType == "Line" || object.geoType == 'LineSegment') {

        for (let index = 0; index < object.geometry.attributes.position.count; index++) {
            verticesVertical[index] = new THREE.Vector3().fromBufferAttribute(object.geometry.attributes.position, index);
            verticesHorizontal[index] = new THREE.Vector3().fromBufferAttribute(object.geometry.attributes.position, index);
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
            const lineVertical = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(verticesVertical),
                new THREE.LineBasicMaterial( {color: 'black'} )
            );
            const lineHorizontal = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(verticesHorizontal),
                new THREE.LineBasicMaterial( {color: 'black'} )
            );
    
            group2d.add(lineVertical);
            group2d.add(lineHorizontal);
    
            // Adicionar texto para linhas
            const labelVertical1 = createTextLabel(object.name + '2', verticesVertical[0]);
            const labelHorizontal1 = createTextLabel(object.name + '1', verticesHorizontal[0]);
            group2d.add(labelVertical1);
            group2d.add(labelHorizontal1);
            break;
        case "LineSegment":
            const lineSegmentVertical = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(verticesVertical),
                new THREE.LineBasicMaterial( {color: 'black'} )
            );
            const lineSegmentHorizontal = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(verticesHorizontal),
                new THREE.LineBasicMaterial( {color: 'black'} )
            );

            group2d.add(lineSegmentVertical);
            group2d.add(lineSegmentHorizontal);
            break;
        case "Point":
            verticesVertical[1] = new THREE.Vector3(verticesVertical[0].x, 0, 0);
            verticesHorizontal[1] = new THREE.Vector3(verticesHorizontal[0].x, 0, 0);
    
            const pointLineVertical = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(verticesVertical),
                new THREE.LineBasicMaterial( {color: 'gray'} )
            );
            const pointLineHorizontal = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(verticesHorizontal),
                new THREE.LineBasicMaterial( {color: 'gray'} )
            );
            group2d.add(pointLineVertical);
            group2d.add(pointLineHorizontal);
    
            const perpendicularOffset = 0.1;
            const horizontalOffset = 0.06;
    
            // Adicionar linhas perpendiculares para a linha vertical
            const perpLineVertical1 = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(verticesVertical[0].x - perpendicularOffset, verticesVertical[0].y - horizontalOffset, verticesVertical[0].z),
                    new THREE.Vector3(verticesVertical[0].x + perpendicularOffset, verticesVertical[0].y + horizontalOffset, verticesVertical[0].z)
                ]),
                new THREE.LineBasicMaterial({ color: 'black' })
            );
            group2d.add(perpLineVertical1);
    
            // Adicionar linhas perpendiculares para a linha horizontal
            const perpLineHorizontal1 = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(verticesHorizontal[0].x - perpendicularOffset, verticesHorizontal[0].y - horizontalOffset, verticesHorizontal[0].z),
                    new THREE.Vector3(verticesHorizontal[0].x + perpendicularOffset, verticesHorizontal[0].y + horizontalOffset, verticesHorizontal[0].z)
                ]),
                new THREE.LineBasicMaterial({ color: 'black' })
            );
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

            createPoint(line1HorizontalPoint.x, line1HorizontalPoint.y, line1HorizontalPoint.z, '', false);
            createPoint(line2HorizontalPoint.x, line2HorizontalPoint.y, line2HorizontalPoint.z, '', false);

            createPoint(line1VerticalPoint.x, line1VerticalPoint.y, line1VerticalPoint.z, '', false);
            createPoint(line2VerticalPoint.x, line2VerticalPoint.y, line2VerticalPoint.z, '', false);

            const line1HorizontalPoint2d = line1HorizontalPoint.clone();
            line1HorizontalPoint2d.y = 0 - line1HorizontalPoint2d.z;
            line1HorizontalPoint2d.z = 0;

            const line2HorizontalPoint2d = line2HorizontalPoint.clone();
            line2HorizontalPoint2d.y = 0 - line2HorizontalPoint2d.z;
            line2HorizontalPoint2d.z = 0;

            // Use points to draw Plane projections
            const pHorizontalLine = new THREE.BufferGeometry().setFromPoints(findMaxPoints(line1HorizontalPoint2d, line2HorizontalPoint2d));
            const lineMaterialHorizontal = new THREE.LineBasicMaterial( {color: 'black'} );
            const planeHorizontalLine = new THREE.LineSegments(pHorizontalLine, lineMaterialHorizontal);

            group2d.add(planeHorizontalLine);

            const pVerticalLine = new THREE.BufferGeometry().setFromPoints(findMaxPoints(line1VerticalPoint, line2VerticalPoint));
            const lineMaterialVertical = new THREE.LineBasicMaterial( {color: 'black'} );
            const planeVerticalLine = new THREE.LineSegments(pVerticalLine, lineMaterialVertical);

            group2d.add(planeVerticalLine);

            const planeLabelVertical = createTextLabel('f' + object.name, new THREE.Vector3().fromBufferAttribute(planeVerticalLine.geometry.attributes.position, 0));
            const planeLabelHorizontal = createTextLabel('h' + object.name, new THREE.Vector3().fromBufferAttribute(planeHorizontalLine.geometry.attributes.position, 0));
            group2d.add(planeLabelVertical);
            group2d.add(planeLabelHorizontal);
            break;

        case "Shape":
            break;
    
        default:
            break;
    }

    group2d.geoParent = object;

    scene2d.add(group2d);

    return group2d;
}