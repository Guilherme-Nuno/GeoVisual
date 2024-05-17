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
const far = 1000; // the far clipping plane

const camera3d = new THREE.PerspectiveCamera(fov, aspectCamera, near, far);
// const camera3d = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / -2, cameraHeight/2 , near, far);
const camera2d = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / 2, cameraHeight/-2 , near, far);

camera3d.position.set( -40, 30, 40);
camera3d.lookAt(0, 0, 0);
camera2d.position.set(0, 0, 40);
camera2d.lookAt(0, 0, 0);

// Create geometry for 3d planes
const geometryHorizontalPlane = new THREE.PlaneGeometry(30,30);
const geometryVerticalPlane = new THREE.PlaneGeometry(30,30);
const colorHorizontalPlane = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.6} );
const colorVerticalPlane = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.6} );
const horizontalPlane = new THREE.Mesh( geometryHorizontalPlane, colorHorizontalPlane);
const verticalPlane = new THREE.Mesh( geometryVerticalPlane, colorVerticalPlane);

geometryHorizontalPlane.rotateX(3.14 / 2);

const edgesHorizontalPlane = new THREE.EdgesGeometry(geometryHorizontalPlane);
const edgesVerticalPlane = new THREE.EdgesGeometry(geometryVerticalPlane);
const linesHorizontalPlane = new THREE.LineSegments(edgesHorizontalPlane, new THREE.LineBasicMaterial( {color: 0x444444} ));
const linesVerticalPlane = new THREE.LineSegments(edgesVerticalPlane, new THREE.LineBasicMaterial( {color: 0x444444} ));

// Create cube encapsulating planes
const geometryCage = new THREE.BoxGeometry(30,30,30);
const materialCage = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.BackSide, visible: false} );
const cage = new THREE.Mesh(geometryCage, materialCage);

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
plane.rotateX(0.5);
// plane.rotateZ(1);
plane.rotateY(1);
plane.position.set(0,0,0);
const plane2d = plane.clone();

const tempPoint1 = createPoint(0, 0, 0, "P");
const tempPoint2 = createPoint(0, -1, -1, "O");
const tempPoint3 = createPoint(0, -1, 1, "Q");
const tempPlane1 = createPlane("alfa", tempPoint1, tempPoint2, tempPoint3);
scene3d.add(tempPlane1);

const geometry = new THREE.BoxGeometry(5, 5, 5);
geometry.rotateX(2);
geometry.rotateY(1);
geometry.translate(0, 6, 6);
const material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, transparent: true, opacity: 0.6} );

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


// Temporary objects

// Line
const point1 = new THREE.Vector3(-10, -5, -2);
const point2 = new THREE.Vector3(14, 8, 7);
const lineTemp = createLine(point1, point2, "a");
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

// Renderers

const renderer3d = new THREE.WebGLRenderer();
const renderer2d = new THREE.WebGLRenderer();

renderer3d.setPixelRatio(window.devicePixelRatio);
renderer2d.setPixelRatio(window.devicePixelRatio);

container3DView.append(renderer3d.domElement);
container2DView.append(renderer2d.domElement);

animate();

function animate() {
    requestAnimationFrame( animate );

    renderer3d.setSize(container3DView.clientWidth, container3DView.clientHeight);
    renderer2d.setSize(container2DView.clientWidth, container2DView.clientHeight);

	renderer3d.render(scene3d, camera3d);
    renderer2d.render(scene2d, camera2d);
}

function draw3dPlane (object){
    switch (object.geoType) {
        case "Point":
            const point = object.clone();
            scene3d.add(point);
            break;
        case "Line":
            const line = object.clone();
            scene3d.add(line);
            break;
        default:
            break;
    }
}

// Creates the various drawings for the representation on an object on the diedric projection
function draw2dPlane (object) {
    const verticesVertical = [];
    const verticesHorizontal = [];

    for (let index = 0; index < object.geometry.attributes.position.count; index++) {
        verticesVertical[index] = new THREE.Vector3().fromBufferAttribute(object.geometry.attributes.position, index);
        verticesHorizontal[index] = new THREE.Vector3().fromBufferAttribute(object.geometry.attributes.position, index);
    }

    for (let index = 0; index < verticesVertical.length; index++) {
        verticesVertical[index].z = 0;
    }

    for (let index = 0; index < verticesHorizontal.length; index++) {
        verticesHorizontal[index].y = 0 - verticesHorizontal[index].z;
        verticesHorizontal[index].z = 0;
    }

    if (object.geometry.attributes.position.count == 2) {
        const lineVertical = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(verticesVertical), new THREE.LineBasicMaterial( {color: 'black'} ));
        const lineHorizontal = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(verticesHorizontal), new THREE.LineBasicMaterial( {color: 'black'} ));

        scene2d.add(lineVertical);
        scene2d.add(lineHorizontal);
    }
    else if (object.geometry.attributes.position.count >= 2) {
        const lineVertical = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry().setFromPoints(verticesVertical)), new THREE.LineBasicMaterial( {color: 'black'} ));
        const lineHorizontal = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry().setFromPoints(verticesHorizontal)), new THREE.LineBasicMaterial( {color: 'black'} ));

        scene2d.add(lineVertical);
        scene2d.add(lineHorizontal);    
    }
}


function createPoint(coordinateX, coordinateY, coordinateZ, pointName){
    // Creates geometry, Material and the mesh
    const pointGeometry = new THREE.SphereGeometry(0.1,12);
    const pointMaterial = new THREE.MeshBasicMaterial( {color: 'black'} );
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    // Adds name and new parameters
    point.geoType = "Point";
    point.name = pointName;
    point.parent = [];
    point.onVerticalPlane = "false";
    point.onHorizontalPlane = "false";
    
    if (coordinateZ == 0) {
        point.onVerticalPlane = "true";
    }
    
    if (coordinateY == 0) {
        point.onHorizontalPlane = "true";
    }

    // Sets position
    point.position.set( coordinateX, coordinateY, coordinateZ);

    return point;
}

function createLine(point1, point2, lineName = "null"){
    // Creates geometry, Material and the mesh
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(findMaxPoints(point1,point2));
    const lineMaterial = new THREE.LineBasicMaterial( {color: 'black'} );
    const line = new THREE.LineSegments(lineGeometry, lineMaterial);

    // Adds name and new parameter geoType
    line.geoType = "Line";
    line.name = lineName;
    line.geoParent = [];
    line.geoChild = [point1, point2];
    line.geoParalelVerticalPlane = "false";
    line.geoParalelHorizontalPlane = "false";

    return line;
}

function findMaxPoints(point1, point2){
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

function createPlane(planeName, object1, object2, object3 = 'null'){
    let line1;
    let line2;

    if (object2.geoType == 'Line') {
        line1 = object1.clone();
        line2 = object2.clone();
    } else if (object3 == 'null'){
        line1 = object1.clone();
        line2 = createLine( object1.position.clone(), object2.position.clone());
    } else {
        line1 = createLine( object1.position.clone(), object2.position.clone());
        line2 = createLine( object1.position.clone(), object3.position.clone());
    }

    const planePoints = [];
    planePoints.push(new THREE.Vector3().fromBufferAttribute(line1.geometry.attributes.position, 0));
    planePoints.push(new THREE.Vector3().fromBufferAttribute(line1.geometry.attributes.position, 1));
    planePoints.push(new THREE.Vector3().fromBufferAttribute(line2.geometry.attributes.position, 1));
    planePoints.push(new THREE.Vector3().fromBufferAttribute(line2.geometry.attributes.position, 0));

    const geometryPlane = new THREE.PlaneGeometry().setFromPoints(planePoints);
    const materialPlane = new THREE.MeshBasicMaterial( {color: 'aquamarine', side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometryPlane, materialPlane);

    return plane;
}