import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

const container3DView = document.querySelector('#vista-3D');
const container2DView = document.querySelector('#vista-2D');

const scene3d = new THREE.Scene();
const scene2d = new THREE.Scene();

scene3d.background = new THREE.Color('white');
scene2d.background = new THREE.Color('white');

// Create a camera
const fov = 50; // AKA Field of View
const aspectCamera = container3DView.clientWidth / container3DView.clientHeight;
const cameraWidth = 40;
const cameraHeight = 40;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera3d = new THREE.PerspectiveCamera(fov, aspectCamera, near, far);
// const camera3d = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / -2, cameraHeight/2 , near, far);
const camera2d = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / -2, cameraHeight/2 , near, far);
// camera2d.rotateZ(3.14);

camera3d.position.set( 0, 40, 90);
camera3d.lookAt(0, 0, 0);
camera2d.position.set(0, 0, 40);
camera2d.lookAt(0, 0, 0);


// Create geometry for 3d planes
const geometryHorizontalPlane = new THREE.PlaneGeometry(30,30);
const geometryVerticalPlane = new THREE.PlaneGeometry(30,30);
const colorHorizontalPlane = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
const colorVerticalPlane = new THREE.MeshBasicMaterial( {color: 'gray', side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
const horizontalPlane = new THREE.Mesh( geometryHorizontalPlane, colorHorizontalPlane);
const verticalPlane = new THREE.Mesh( geometryVerticalPlane, colorVerticalPlane);

geometryHorizontalPlane.rotateX(3.14 / 2);

const edgesHorizontalPlane = new THREE.EdgesGeometry(geometryHorizontalPlane);
const edgesVerticalPlane = new THREE.EdgesGeometry(geometryVerticalPlane);
const linesHorizontalPlane = new THREE.LineSegments(edgesHorizontalPlane, new THREE.LineBasicMaterial( {color: 0x444444} ));
const linesVerticalPlane = new THREE.LineSegments(edgesVerticalPlane, new THREE.LineBasicMaterial( {color: 0x444444} ));

// Create Earth line
const points = [];

points.push(new THREE.Vector3(-15, 0, 0));
points.push(new THREE.Vector3(15, 0, 0));

const geometryEarthLine = new THREE.BufferGeometry().setFromPoints(points);

const earthLine = new THREE.LineSegments(geometryEarthLine, new THREE.LineBasicMaterial( {color: 'black'}));
const earthLine2d = earthLine.clone();

// Create example object

const geometryPlane = new THREE.PlaneGeometry(20, 20);
const colorPlane = new THREE.MeshBasicMaterial( {color: 'aquamarine', side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
const plane = new THREE.Mesh(geometryPlane, colorPlane);
//plane.rotateX(0.5);
// plane.rotateZ(1);
// plane.rotateY(1);
plane.position.set(0,0,0);
const plane2d = plane.clone();


const geometry = new THREE.BoxGeometry(8, 8, 8);
geometry.rotateX(2);
geometry.rotateY(1);
geometry.translate(0, 0, 0);
const material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, transparent: true, opacity: 0.6} );

const cube = new THREE.Mesh(geometry, material);
const cube3d = cube.clone();

const edgesCube = new THREE.EdgesGeometry(geometry);
const linesCube = new THREE.LineSegments(edgesCube, new THREE.LineBasicMaterial( {color: 0x444444} ));
const linesCube3d = linesCube.clone();

    const grupoLinhas = new THREE.Group();
    // criar as linhas x e y
    // criar material para as linhas
    const linhaAzul = new THREE.LineBasicMaterial({color: 0x0000ff});
    const linhaVermelha = new THREE.LineBasicMaterial({color: 0xff0000});

    // criar pontos para as linhas
    const pontosX = [];
    const pontosY = [];

    pontosX.push(new THREE.Vector3( -20, 0, 0));
    pontosX.push(new THREE.Vector3( -10, 0, 0));
    pontosY.push(new THREE.Vector3( -20, 0, 0));
    pontosY.push(new THREE.Vector3( -20, 10, 0));

    // adicionar geometrias
    const geometriaLinhaX = new THREE.BufferGeometry().setFromPoints(pontosX);
    const geometriaLinhaY = new THREE.BufferGeometry().setFromPoints(pontosY);

    // criar linhas
    const linhaX = new THREE.Line(geometriaLinhaX, linhaAzul);
    const linhaY = new THREE.Line(geometriaLinhaY, linhaVermelha);

    // criar grupo para as linhas e adicionar linhas ao grupo
    grupoLinhas.add(linhaX);
    grupoLinhas.add(linhaY);


// Add objects to scene

scene2d.add(earthLine2d);

scene3d.add(horizontalPlane);
scene3d.add(verticalPlane);
scene3d.add(linesHorizontalPlane);
scene3d.add(linesVerticalPlane)
scene3d.add(earthLine);
scene3d.add(grupoLinhas);

// Temporary objects

/*
scene3d.add(plane);
scene2d.add(plane2d);
*/


scene2d.add(cube);
scene2d.add(linesCube);
scene3d.add(cube3d);
scene3d.add(linesCube3d);


// Renderers

const renderer3d = new THREE.WebGLRenderer();
const renderer2d = new THREE.WebGLRenderer();

renderer3d.setSize(container3DView.clientWidth, container3DView.clientHeight);
renderer2d.setSize(container2DView.clientWidth, container2DView.clientHeight);

renderer3d.setPixelRatio(window.devicePixelRatio);
renderer2d.setPixelRatio(window.devicePixelRatio);

container3DView.append(renderer3d.domElement);
container2DView.append(renderer2d.domElement);

renderer3d.render(scene3d, camera3d);
renderer2d.render(scene2d, camera2d);