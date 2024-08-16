import { viewHeigth, viewWidth, findVectorByName } from "./main.js";
import { createPoint, pointNamesList, existingPointList, createLine, createPlane } from "./create.js";
import { findDeviationFromAngle } from "./calculations.js";

document.addEventListener("DOMContentLoaded", function() {
    // Event Listeners
    document.getElementById("objectType1").addEventListener("change", () => {
        updateOnFocusObject('objectType1', 'objectName1')});
    document.getElementById("objectType2").addEventListener("change", () => {
        updateOnFocusObject('objectType2', 'objectName2')});
});

// Variables
let janelaMaximizada = false;
let menu = 0;
let menuLine = 0;
let menuPlane = 0;
let menuPoint = 0;

// First menu
const buttonPoint = document.getElementById("button_point");
const buttonLine = document.getElementById("button_line");
const buttonPlane = document.getElementById("button_plane");
const button2D = document.getElementById("button_2D");
const button3D = document.getElementById("button_3D");
const buttonFaq = document.getElementById("button_faq");

const controlsPoint = document.getElementById("controls_point");
const controlsLine = document.getElementById("controls_line");
const controlsPlane = document.getElementById("controls_plane");
const controls2D = document.getElementById("controls_2D");
const controls3D = document.getElementById("controls_3D");
const controlsFaq = document.getElementById("controls_faq");

// Point menu
const buttonPointNew = document.getElementById("buttonPointNew");
const buttonPointIntersection = document.getElementById("buttonPointIntersection");
const buttonPointNotable = document.getElementById("buttonPointNotable");

const controlsPointNew = document.getElementById("controls_point_new");
const controlsPointIntersection = document.getElementById("controlsPointIntersection");
const controlsPointNotable = document.getElementById("controlsPointNotable");

// Line menu
const buttonLineLevel = document.getElementById("button_line_level");
const buttonLinePoint = document.getElementById("buttonLinePoint");
const buttonLineFrontal = document.getElementById("button_line_frontal");
const buttonLineFrontoHorizontal = document.getElementById("button_line_frontoHorizontal");
const buttonLineTopo = document.getElementById("button_line_topo");
const buttonLineVertical = document.getElementById("button_line_vertical");
const buttonLinePass = document.getElementById("button_line_pass");
const buttonLineOblique = document.getElementById("button_line_oblique");
const buttonLinePerfil = document.getElementById("button_line_perfil");

const spanPoint1Name = document.getElementById("spanPoint1Name");
const spanPoint2Name = document.getElementById("spanPoint2Name");
const spanAngle = document.getElementById("spanAngulo");
const spanAnglePHP = document.getElementById("spanAnglePHP");
const spanAnglePFP = document.getElementById("spanAnglePFP");

const controlsLinePoint = document.getElementById("controlsLinePoint");
const point1Name = document.getElementById("point1Name");
const point2Name = document.getElementById("point2Name");
const angle = document.getElementById("angulo");
const anglePHP = document.getElementById("anglePHP");
const anglePFP = document.getElementById("anglePFP");
const angleSelect = document.getElementById("angleSelect");
const phpSelect = document.getElementById("phpSelect");
const pfpSelect = document.getElementById("pfpSelect");

// Plane menu
const buttonPlanePoints = document.getElementById("buttonPlanePoints");

const controlsPlanePoints = document.getElementById("controlsPlanePoints");

export function showPointNameList(){
    const selectElement = document.getElementById("name");

    while (selectElement.firstChild) selectElement.removeChild(selectElement.firstChild);

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Nome';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectElement.appendChild(placeholderOption);

    pointNamesList.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        selectElement.appendChild(option);
    });
}

export function showExistingPointList(elementId){
    const selectElement = document.getElementById(elementId);

    while (selectElement.firstChild) selectElement.removeChild(selectElement.firstChild);

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Ponto';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectElement.appendChild(placeholderOption);

    existingPointList.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        selectElement.appendChild(option);
    });
}

export function expandirJanela(janelaID) {

    let vistas3D = document.getElementById("vista-3D");
    let vistas2D = document.getElementById("vista-2D");
    let controlos = document.getElementById("controlos");
    let box = document.getElementById("box-container");
    let botao3D = document.getElementById("botao-3D");
    let botao2D = document.getElementById("botao-2D");

    if(!janelaMaximizada){
        if (janelaID === 'vista-3D'){

            vistas3D.style.position = 'absolute';
            vistas3D.style.top = 0;
            vistas3D.style.left = 0;
            vistas3D.style.width = '97vw';
            vistas3D.style.height = '97vh';


            vistas2D.style.position = 'absolute';
            vistas2D.style.top = '20px';
            vistas2D.style.right = '30px';
            vistas2D.style.width = '20vw';
            vistas2D.style.height = '20vh';
            vistas2D.style.flex = '0 0 30%';
            vistas2D.style.zIndex = 1;

            botao3D.textContent = 'X';
            botao2D.style.display = 'none';

        } else {

            vistas2D.style.position = 'absolute';
            vistas2D.style.top = 0;
            vistas2D.style.right = 0;
            vistas2D.style.width = '97vw';
            vistas2D.style.height = '97vh';


            vistas3D.style.position = 'absolute';
            vistas3D.style.top = '20px';
            vistas3D.style.left = '30px';
            vistas3D.style.width = '20vw';
            vistas3D.style.height = '20vh';
            vistas3D.style.flex = '0 0 30%';
            vistas3D.style.zIndex = 1;

            botao2D.textContent = 'X';
            botao3D.style.display = 'none';
        }

        controlos.style.display = 'none';
        controlos.style.flex = '0 0 0';

        box.style.flex = '0 0 95%';

        janelaMaximizada = true;

    } else {
        
        vistas3D.style.position = '';
        vistas3D.style.top = '';
        vistas3D.style.left = '';
        vistas3D.style.width = viewWidth;
        vistas3D.style.height = viewHeigth;
        vistas3D.style.flex = '';
        vistas3D.style.zIndex = '';

        vistas2D.style.position = '';
        vistas2D.style.top = '';
        vistas2D.style.right = '';
        vistas2D.style.width = viewWidth;
        vistas2D.style.height = viewHeigth;
        vistas2D.style.flex = '';
        vistas2D.style.zIndex = '';

        controlos.style.display = '';
        controlos.style.flex = '';

        botao3D.style.display ='';
        botao3D.textContent = '〈〉';

        botao2D.style.display ='';
        botao2D.textContent = '〈〉';

        box.style.flex = '';

        janelaMaximizada = false;
    }
}

export function selectMenu(select) {

    if (menu == 0 || menu != select) {

        clearMenu();

        switch (select) {
            case 1:
            buttonPoint.style.backgroundColor = 'gray';
            controlsPoint.style.display = 'block';
            menu = 1;
            break;
                
            case 2:
            buttonLine.style.backgroundColor = 'gray';
            controlsLine.style.display = 'block';
            menu = 2;
            break;

            case 3:
            buttonPlane.style.backgroundColor = 'gray';
            controlsPlane.style.display = 'block';
            menu = 3;
            break;

            case 4:
            button2D.style.backgroundColor = 'gray';
            controls2D.style.display = 'block';
            menu = 4;
            break;

            case 5:
            button3D.style.backgroundColor = 'gray';
            controls3D.style.display = 'block';
            menu = 5;
            break;

            case 6:
            buttonFaq.style.backgroundColor = 'gray';
            controlsFaq.style.display = 'block';
            menu = 6;
            break;
            
            default:
            break;
        }
    } else {

        clearMenu();

        menu = 0;
    }
}

export function newPoint(){
    const coordX = +document.getElementById('coordX').value;
    const coordY = +document.getElementById('coordY').value;
    const coordZ = +document.getElementById('coordZ').value;
    const name = document.getElementById('name').value;

    createPoint(coordX, coordY, coordZ, name);

    document.getElementById('coordX').value = '';
    document.getElementById('coordY').value = '';
    document.getElementById('coordZ').value = '';
    document.getElementById('name').value = '';
}

export function newLine(){
    const point1 = findVectorByName( point1Name.value );
    const point2 = findVectorByName( point2Name.value );
    const pointAngle = +angle.value;
    const phpAngle = +anglePHP.value;
    const pfpAngle = +anglePFP.value;
    let rigthOpening, rigthOpeningPHP, rigthOpeningPFP;

    if (angleSelect.value == 'rigth') {
        rigthOpening = true;
    } else {
        rigthOpening = false;
    }

    if (phpSelect.value == 'rigth') {
        rigthOpeningPHP = true;
    } else {
        rigthOpeningPHP = false;
    }

    if (pfpSelect.value == 'rigth') {
        rigthOpeningPFP = true;
    } else {
        rigthOpeningPFP = false;
    }
    
    let newX, newY, newZ, pointTemp;

    switch (menuLine) {
        case 1:
            newZ = findDeviationFromAngle(2, pointAngle) + point1.position.z;
            newY = point1.position.y;
            
            if (rigthOpening) {
                newX = point1.position.x - 2;
            } else{
                newX = point1.position.x + 2;
            }

            pointTemp = createPoint(newX, newY, newZ, "", false);

            createLine(point1, pointTemp);
        break;

        case 2:
            newY = findDeviationFromAngle(2, pointAngle) + point1.position.y;
            newZ = point1.position.z;
            
            if (rigthOpening) {
                newX = point1.position.x - 2;
            } else{
                newX = point1.position.x + 2;
            }

            pointTemp = createPoint(newX, newY, newZ, "", false);

            createLine(point1, pointTemp);
        break;

        case 3:
            newX = point1.position.x - 2;

            pointTemp = createPoint(newX, point1.position.y, point1.position.z, "", false);

            createLine( point1, pointTemp);
        break;

        case 4:
            newZ = point1.position.z + 2;

            pointTemp = createPoint(point1.position.x, point1.position.y, newZ, "", false);

            createLine( point1, pointTemp);
        break;
        
        case 5:
            newY = point1.position.y + 2;

            pointTemp = createPoint(point1.position.x, newY, point1.position.z, "", false);

            createLine( point1, pointTemp);
        break;

        case 6:
            createLine( createPoint(0,0,0,'',false), createPoint(1,0,0,'',false) );
        break;

        case 7:
            if (point1Name.value != '' && point2Name.value != '') {
                createLine(point1, point2);
            } else {
                if (rigthOpeningPHP) {
                    newY = point1.position.y + findDeviationFromAngle( 2, phpAngle);
                } else{
                    newY =point1.position.y - findDeviationFromAngle( 2, phpAngle);
                }
                if (rigthOpeningPFP) {
                    newZ = point1.position.z + findDeviationFromAngle( 2, pfpAngle);
                } else{
                    newZ =point1.position.z - findDeviationFromAngle( 2, pfpAngle);
                }
                
                newX = point1.position.x - 2;

                pointTemp = createPoint(newX, newY, newZ, '', false);
                createLine( point1, pointTemp);
            }
        break;

        case 8:
        break;

        case 9:
            if (point1 != point2) {
                createLine( point1, point2);
            }
        break;
        default:
        break;
    }
}

export function newPlane() {
    const point1Name = document.getElementById('planePoint1Name').value;
    const point2Name = document.getElementById('planePoint2Name').value;
    const point3Name = document.getElementById('planePoint3Name').value;

    if (point1Name != point2Name && point2Name != point3Name && point1Name != point3Name) {
        const point1 = findVectorByName( point1Name );
        const point2 = findVectorByName( point2Name );
        const point3 = findVectorByName( point3Name );

        createPlane(point1, point2, point3);
    }
}

export function selectMenuPoint( select ){
    if (menuPoint == 0 || menuPoint != select) {
        
        clearMenuPoint();

        switch (select) {
            case 1:
                buttonPointNew.style.backgroundColor = 'gray';
                controlsPointNew.style.display = 'block';
                menuPoint = select;
            break;
            case 2:
                buttonPointIntersection.style.backgroundColor = 'gray';
                controlsPointIntersection.style.display = 'block';
                menuPoint = select;
            break;
            case 3:
                buttonPointNotable.style.backgroundColor = 'gray';
                controlsPointNotable.style.display = 'block';
                menuPoint = select;
            default:
            break;
        }
    } else {
        clearMenuPoint();
        menuPoint = 0;
    }
}

export function selectMenuLine( select ){
    if (menuLine == 0 || menuLine != select) {

        clearMenuLine();

        switch (select) {
            case 1:
                buttonLineLevel.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 2:
                buttonLineFrontal.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 3:
                buttonLineFrontoHorizontal.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 4:
                buttonLineTopo.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 5:
                buttonLineVertical.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 6:
                buttonLinePass.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanPoint1Name.style.display = 'none';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 7:
                buttonLineOblique.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                menuLine = select;
            break;
            case 8:
                buttonLinePerfil.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                menuLine = select;
            break;
            case 9:
                buttonLinePoint.style.backgroundColor = 'gray';
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
                break;
            default:
                break;
        }
    } else {
        clearMenuLine();
        menuLine = 0;
    }
}

export function selectMenuPlane( select ) {
    if (menuPlane == 0 || menuPlane != select) {
        clearMenuPlane();

        switch (select) {
            case 11:
                buttonPlanePoints.style.background = 'gray';
                controlsPlanePoints.style.display = 'block';
                menuPlane = select;
                break;
            
            default:
                break;
        }
    } else {
        clearMenuPlane();
        menuPlane = 0;
    }
}

function clearMenu(){
    buttonPoint.style.backgroundColor = '';
    buttonLine.style.backgroundColor = '';
    buttonPlane.style.backgroundColor = '';
    button3D.style.backgroundColor = '';
    button2D.style.backgroundColor = '';
    buttonFaq.style.backgroundColor = '';

    controlsPoint.style.display = 'none';
    controlsLine.style.display = 'none';
    controlsPlane.style.display = 'none';
    controls2D.style.display = 'none';
    controls3D.style.display = 'none';
    controlsFaq.style.display = 'none';

    clearMenuLine();
    clearMenuPlane();
    clearMenuPoint();
}

function clearMenuPoint() {
    buttonPointNew.style.backgroundColor = '';
    buttonPointIntersection.style.backgroundColor = '';
    buttonPointNotable.style.backgroundColor = '';

    controlsPointNew.style.display = 'none';
    controlsPointIntersection.style.display = 'none';
    controlsPointNotable.style.display = 'none';
}

function clearMenuLine(){
    buttonLineLevel.style.backgroundColor = '';
    buttonLinePoint.style.backgroundColor = '';
    buttonLineFrontal.style.backgroundColor = '';
    buttonLineFrontoHorizontal.style.backgroundColor = '';
    buttonLineTopo.style.backgroundColor = '';
    buttonLineVertical.style.backgroundColor = '';
    buttonLinePass.style.backgroundColor = '';
    buttonLineOblique.style.backgroundColor = '';
    buttonLinePerfil.style.backgroundColor = '';

    controlsLinePoint.style.display = 'none';

    spanPoint1Name.style.display = '';
    spanPoint2Name.style.display = '';
    spanAngle.style.display = '';
    spanAnglePFP.style.display = '';
    spanAnglePHP.style.display = '';
}

function clearMenuPlane() {
    buttonPlanePoints.style.backgroundColor = '';

    controlsPlanePoints.style.display = 'none';
}

function updateOnFocusObject(select, input) {
    const selectObject = document.getElementById(select);
    const inputObject = document.getElementById(input);

    while (inputObject.firstChild) inputObject.removeChild(inputObject.firstChild);
    inputObject.onfocus = null;

    switch (selectObject.value) {
        case "point":
            inputObject.onfocus = showExistingPointList(input);
        break;
        case "line":
            // inputObject.onfocus = showExistingLineList;
        break;
        case "plane":
            // inputObject.onfocus = showExistingPlaneList;
        break;
    
        default:
            break;
    }
}