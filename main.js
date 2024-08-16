import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js';
import { createPoint, createLine, createPlane, createShape } from './create.js';
import { draw2dPlane } from './draw.js';

// Global Variables
let vistas3D = document.getElementById("vista-3D");
export const viewWidth = vistas3D.clientWidth;
export const viewHeigth = vistas3D.clientHeight;

const container3DView = document.querySelector('#vista-3D');
const container2DView = document.querySelector('#vista-2D');

export const scene3d = new THREE.Scene();
export const scene2d = new THREE.Scene();

scene3d.background = new THREE.Color('white');
scene2d.background = new THREE.Color('white');

// Renderers

const renderer3d = new THREE.WebGLRenderer();
const renderer2d = new THREE.WebGLRenderer();

renderer3d.setPixelRatio(window.devicePixelRatio);
renderer2d.setPixelRatio(window.devicePixelRatio);

container3DView.append(renderer3d.domElement);
container2DView.append(renderer2d.domElement);

// Create a camera
const fov = 50; // AKA Field of View
const aspectCamera = container3DView.clientWidth / container3DView.clientHeight;
const cameraWidth = 35;
const cameraHeight = 35;
const near = 0.1; // the near clipping plane
const far = 1000; // the far clipping plane

// const camera3d = new THREE.PerspectiveCamera(fov, aspectCamera, near, far);
const camera3d = new THREE.OrthographicCamera((cameraWidth / -2) - 10, (cameraWidth / 2) + 10, (cameraHeight / 2) + 10, (cameraHeight / -2) - 10 , near, far);
const camera2d = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / 2, cameraHeight /-2 , near, far);

const controls3D = new OrbitControls (camera3d, renderer3d.domElement);

camera3d.position.set( -60, 30, 40);
camera3d.lookAt(0, 0, 0);
camera2d.position.set(0, 0, 40);
camera2d.lookAt(0, 0, 0);

controls3D.update();

// Create geometry for 3d planes
const geometryHorizontalPlane = new THREE.PlaneGeometry(30,30);
const geometryVerticalPlane = new THREE.PlaneGeometry(30,30);
const geometryB13 = new THREE.PlaneGeometry(30,30);
const geometryB24 = new THREE.PlaneGeometry(30,30);
const colorHorizontalPlane = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false} );
const colorVerticalPlane = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false} );
const colorB13 = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false} );
const colorB24 = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false} );
export const horizontalPlane = new THREE.Mesh( geometryHorizontalPlane, colorHorizontalPlane);
export const verticalPlane = new THREE.Mesh( geometryVerticalPlane, colorVerticalPlane);
export const b13 = new THREE.Mesh( geometryB13, colorB13);
export const b24 = new THREE.Mesh( geometryB24, colorB24);

geometryHorizontalPlane.rotateX(Math.PI / 2);
geometryB13.rotateX(Math.PI / 4);
geometryB24.rotateX(-(Math.PI / 4));

const edgesHorizontalPlane = new THREE.EdgesGeometry(geometryHorizontalPlane);
const edgesVerticalPlane = new THREE.EdgesGeometry(geometryVerticalPlane);
const edgesB13 = new THREE.EdgesGeometry(geometryB13);
const edgesB24 = new THREE.EdgesGeometry(geometryB24);
const linesHorizontalPlane = new THREE.LineSegments(edgesHorizontalPlane, new THREE.LineBasicMaterial( {color: 'DarkGray'} ));
const linesVerticalPlane = new THREE.LineSegments(edgesVerticalPlane, new THREE.LineBasicMaterial( {color: 'DarkGray'} ));
const linesB13 = new THREE.LineSegments(edgesB13, new THREE.LineBasicMaterial( {color: 'DarkGray'} ));
const linesB24 = new THREE.LineSegments(edgesB24, new THREE.LineBasicMaterial( {color: 'DarkGray'} ));

// Create cube encapsulating planes
const geometryCage = new THREE.BoxGeometry(30,30,30);
const materialCage = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.BackSide, visible: false} );
export const cage = new THREE.Mesh(geometryCage, materialCage);

// Create Earth line
const points = [];

points.push(new THREE.Vector3(-15, 0, 0));
points.push(new THREE.Vector3(15, 0, 0));

const geometryEarthLine = new THREE.BufferGeometry().setFromPoints(points);

const earthLine = new THREE.LineSegments(geometryEarthLine, new THREE.LineBasicMaterial( {color: 'DarkGray'}));
const earthLine2d = earthLine.clone();

// Create example object

// const tempPoint1 = createPoint(4, 5, 5, "R");
// const tempPoint2 = createPoint(1, 1, 7, "S");
// const tempPoint3 = createPoint(-3, -2, 3, "T");
// const tempPlane1 = createPlane(tempPoint3, tempPoint1, tempPoint2);
// const tempShape = createShape( 4, 5, tempPoint3.position, tempPlane1 );

// const tempPoint5 = createPoint(-2, 4, 7, "N");
// const tempPoint4 = createPoint(-4, 3, 2, "M");
// const tempPoint6 = createPoint(0, -3, 4, "S");
// const tempPlane2 = createPlane("beta", tempPoint4, tempPoint5, tempPoint6);

const geometry = new THREE.BoxGeometry(5, 5, 5);
geometry.rotateX(2);
geometry.rotateY(1);
geometry.translate(0, 6, 6);
const material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, transparent: true, opacity: 0.6, depthWrite: false} );

const cube = new THREE.Mesh(geometry, material);
const cube3d = cube.clone();

const edgesCube = new THREE.EdgesGeometry(geometry);
const linesCube = new THREE.LineSegments(edgesCube, new THREE.LineBasicMaterial( {color: 0x444444} ));
const linesCube3d = linesCube.clone();

//draw2dPlane(cube);
//scene3d.add(cube);
//scene3d.add(linesCube);

// Add objects to scene

scene2d.add(earthLine2d);

scene3d.add(horizontalPlane);
scene3d.add(verticalPlane);
scene3d.add(linesHorizontalPlane);
scene3d.add(linesVerticalPlane)
scene3d.add(earthLine);
scene3d.add(cage);
scene3d.add(b13);
scene3d.add(linesB13);
scene3d.add(b24);
scene3d.add(linesB24);


// Temporary objects

// Line
const point1 = new THREE.Vector3(-10, -5, -2);
const point2 = new THREE.Vector3(14, 8, 7);
// const lineTemp = createLine(point1, point2, "a");
//draw2dPlane(lineTemp);
//draw3dPlane(lineTemp);

/* Plano
scene3d.add(plane);
scene2d.add(plane2d);
*/

/* Cubo
scene2d.add(cube);
scene2d.add(linesCube);
scene3d.add(cube3d);
scene3d.add(linesCube3d);
*/

animate();

function animate() {
    requestAnimationFrame( animate );

    controls3D.target = new THREE.Vector3 (0, 0, 0);
    controls3D.update();

    renderer3d.setSize(container3DView.clientWidth, container3DView.clientHeight);
    renderer2d.setSize(container2DView.clientWidth, container2DView.clientHeight);

	renderer3d.render(scene3d, camera3d);
    renderer2d.render(scene2d, camera2d);
}

export function findVectorByName( name ){
    return scene3d.getObjectByName( name );
}