import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { createTextLabel } from '../create/create.js';
import { createPoint } from '../create/point.js';
import { scene3d } from '../main.js';

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

            const label3Dline = createTextLabel(line.name, new THREE.Vector3().fromBufferAttribute(line.geometry.attributes.position, 0));
            group3d.add(label3Dline);
            break;
        case "Plane":
            const plane = object.clone();
            plane.geoType = "Plane";
            plane.geoChild = object.geoChild;
            plane.geoQuaternion = object.geoQuaternion;
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