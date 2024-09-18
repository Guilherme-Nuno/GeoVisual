import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js';
import { clearSaveStack } from './utils/fileUtils.js';
import { createNamesLists } from './utils/nameLists.js';


// Global Variables
const PROJECTIONPLANECOLORS = '#FBFBFB';
export const LINECOLOR = 'black';
export const BUTTONSELECTCOLOR = 'gray';

let vistas3D = document.getElementById("vista-3D");
export const viewWidth = vistas3D.clientWidth;
export const viewHeigth = vistas3D.clientHeight;

const container3DView = document.querySelector('#vista-3D');
const container2DView = document.querySelector('#vista-2D');

export const scene3d = new THREE.Scene();
export const scene2d = new THREE.Scene();

scene3d.background = new THREE.Color('white');
scene2d.background = new THREE.Color('white');

export let horizontalPlane;
export let verticalPlane;
export let b13;
export let b24;

export let linesB13;
export let linesB24;

export let cage;

// Renderers

const renderer3d = new THREE.WebGLRenderer( {antialias: true} );
const renderer2d = new THREE.WebGLRenderer( {antialias: true} );

renderer3d.setPixelRatio(window.devicePixelRatio);
renderer2d.setPixelRatio(window.devicePixelRatio);

container3DView.append(renderer3d.domElement);
container2DView.append(renderer2d.domElement);

let controls3D;
let camera2d, camera3d;

function createInitialScenes() {

    // Create camera parameters
    const cameraWidth = 35;
    const cameraHeight = 35;
    const near = 0.1; // the near clipping plane
    const far = 1000; // the far clipping plane

    // const camera3d = new THREE.PerspectiveCamera(fov, aspectCamera, near, far);
    camera3d = new THREE.OrthographicCamera((cameraWidth / -2) - 10, (cameraWidth / 2) + 10, (cameraHeight / 2) + 10, (cameraHeight / -2) - 10 , near, far);
    camera2d = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / 2, cameraHeight /-2 , near, far);

    controls3D = new OrbitControls (camera3d, renderer3d.domElement);

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
    const colorHorizontalPlane = new THREE.MeshBasicMaterial( {color: PROJECTIONPLANECOLORS, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false} );
    const colorVerticalPlane = new THREE.MeshBasicMaterial( {color: PROJECTIONPLANECOLORS, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false} );
    const colorB13 = new THREE.MeshBasicMaterial( {color: PROJECTIONPLANECOLORS, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false, visible: false} );
    const colorB24 = new THREE.MeshBasicMaterial( {color: PROJECTIONPLANECOLORS, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false, visible: false} );
    horizontalPlane = new THREE.Mesh( geometryHorizontalPlane, colorHorizontalPlane);
    verticalPlane = new THREE.Mesh( geometryVerticalPlane, colorVerticalPlane);
    b13 = new THREE.Mesh( geometryB13, colorB13);
    b24 = new THREE.Mesh( geometryB24, colorB24);

    geometryHorizontalPlane.rotateX(Math.PI / 2);
    geometryB13.rotateX(Math.PI / 4);
    geometryB24.rotateX(-(Math.PI / 4));

    const edgesHorizontalPlane = new THREE.EdgesGeometry(geometryHorizontalPlane);
    const edgesVerticalPlane = new THREE.EdgesGeometry(geometryVerticalPlane);
    const edgesB13 = new THREE.EdgesGeometry(geometryB13);
    const edgesB24 = new THREE.EdgesGeometry(geometryB24);
    const linesHorizontalPlane = new THREE.LineSegments(edgesHorizontalPlane, new THREE.LineBasicMaterial( {color: 'DarkGray'} ));
    const linesVerticalPlane = new THREE.LineSegments(edgesVerticalPlane, new THREE.LineBasicMaterial( {color: 'DarkGray'} ));
    linesB13 = new THREE.LineSegments(edgesB13, new THREE.LineBasicMaterial( {color: 'DarkGray', visible: false} ));
    linesB24 = new THREE.LineSegments(edgesB24, new THREE.LineBasicMaterial( {color: 'DarkGray', visible: false} ));

    // Create cube encapsulating planes
    const geometryCage = new THREE.BoxGeometry(30,30,30);
    const materialCage = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.BackSide, visible: false} );
    cage = new THREE.Mesh(geometryCage, materialCage);

    // Create Earth line
    const points = [];

    points.push(new THREE.Vector3(-15, 0, 0));
    points.push(new THREE.Vector3(15, 0, 0));

    const geometryEarthLine = new THREE.BufferGeometry().setFromPoints(points);

    const earthLine = new THREE.LineSegments(geometryEarthLine, new THREE.LineBasicMaterial( {color: 'DarkGray'}));
    const earthLine2d = earthLine.clone();

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

   createNamesLists();
}

createInitialScenes();
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

export function findObjectByName( name ){
    return scene3d.getObjectByName( name );
}

function clearScene(scene) {
    while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);
    }
}

export function clearAllScenes() {
    clearScene(scene2d);
    clearScene(scene3d);
    clearSaveStack();
    createInitialScenes();
}