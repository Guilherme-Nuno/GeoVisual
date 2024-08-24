import { viewHeigth, viewWidth, findObjectByName, b13, b24, linesB13, linesB24, horizontalPlane, verticalPlane, clearAllScenes } from "./main.js";
import { createPoint, pointNamesList, existingPointList, createLine, createPlane, existingLineList } from "./create.js";
import { findDeviationFromAngle, intersection } from "./calculations.js";
import { addSaveStack } from "./fileUtils.js";

const BUTTONSELECTCOLOR = 'gray';

document.addEventListener("DOMContentLoaded", function() {
    // Event Listeners
    document.getElementById("objectType1").addEventListener("change", () => {
        updateOnFocusObject('objectType1', 'objectName1')});
    document.getElementById("objectType2").addEventListener("change", () => {
        updateOnFocusObject('objectType2', 'objectName2')});
    document.getElementById("object1PlaneType").addEventListener("change", () => {
        updateOnFocusObject('object1PlaneType', 'object1PlaneName')});
    document.getElementById("object2PlaneType").addEventListener("change", () => {
        updateOnFocusObject('object2PlaneType', 'object2PlaneName')});
    document.getElementById("object3PlaneType").addEventListener("change", () => {
        updateOnFocusObject('object3PlaneType', 'object3PlaneName')});
});

// Variables
let janelaMaximizada = false;
let showBisector = false;
let menu = 0;
let menuFile = 'none';
let menuLine = 'none';
let menuPlane = 'none';
let menuPoint = 0;

// First menu
const buttonFile = document.getElementById("buttonFile");
const buttonPoint = document.getElementById("button_point");
const buttonLine = document.getElementById("button_line");
const buttonPlane = document.getElementById("button_plane");
const button2D = document.getElementById("button_2D");
const button3D = document.getElementById("button_3D");
const buttonFaq = document.getElementById("button_faq");

const controlsFile = document.getElementById("controlsFile");
const controlsPoint = document.getElementById("controls_point");
const controlsLine = document.getElementById("controls_line");
const controlsPlane = document.getElementById("controls_plane");
const controls2D = document.getElementById("controls_2D");
const controls3D = document.getElementById("controls_3D");
const controlsFaq = document.getElementById("controls_faq");

// File menu
const controlsFileSave = document.getElementById("controlsFileSave");
const controlsFileLoad = document.getElementById("controlsFileLoad");

const buttonFileMenuSave = document.getElementById("buttonFileMenuSave");
const buttonFileMenuLoad = document.getElementById("buttonFileMenuLoad");
const buttonFileSave = document.getElementById("buttonFileSave");
const buttonFileLoad = document.getElementById("buttonFileLoad");

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
const buttonPlaneHorizontal = document.getElementById("buttonPlaneHorizontal");
const buttonPlaneFrontal = document.getElementById("buttonPlaneFrontal");
const buttonPlaneOblique = document.getElementById("buttonPlaneOblique");
const buttonPlanePerfil = document.getElementById("buttonPlanePerfil");
const buttonPlaneRamp = document.getElementById("buttonPlaneRamp");
const buttonPlaneTop = document.getElementById("buttonPlaneTop");
const buttonPlaneVertical = document.getElementById("buttonPlaneVertical");
const buttonPlaneLines = document.getElementById("buttonPlaneLines");
const buttonPlaneLinePoint = document.getElementById("buttonPlaneLinePoint");

const controlsPlaneMenu = document.getElementById("controlsPlaneMenu");

const object1Plane = document.getElementById("object1Plane");
const object1PlaneType = document.getElementById("object1PlaneType");
const object1PlaneName = document.getElementById("object1PlaneName");

const object2Plane = document.getElementById("object2Plane");
const object2PlaneType = document.getElementById("object2PlaneType");
const object2PlaneName = document.getElementById("object2PlaneName");

const object3Plane = document.getElementById("object3Plane");
const object3PlaneType = document.getElementById("object3PlaneType");
const object3PlaneName = document.getElementById("object3PlaneName");

const spanPlaneAnglePHP = document.getElementById("spanPlaneAnglePHP");
const planeAnglePHP = document.getElementById("planeAnglePHP");
const planePhpSelect = document.getElementById("planePhpSelect");

const spanPlaneAnglePFP = document.getElementById("spanPlaneAnglePFP");
const planeAnglePFP = document.getElementById("planeAnglePFP");
const planePfpSelect = document.getElementById("planePfpSelect");

const controlsPlanePoints = document.getElementById("controlsPlanePoints");

export function showBisectorPlanes(){
    switch (showBisector) {
        case false:
            b13.material.visible = true;
            b24.material.visible = true;
            linesB13.material.visible = true;
            linesB24.material.visible = true;
            showBisector = true;
        break;
        case true:
            b13.material.visible = false;
            b24.material.visible = false;
            linesB13.material.visible = false;
            linesB24.material.visible = false;
            showBisector = false;
        break;
        default:
            break;
    }
}

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

export function showExistingLineList(elementId){
    const selectElement = document.getElementById(elementId);

    while (selectElement.firstChild) selectElement.removeChild(selectElement.firstChild);

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Recta';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectElement.appendChild(placeholderOption);

    existingLineList.forEach(name => {
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
        vistas3D.style.width = '';
        vistas3D.style.height = '';
        vistas3D.style.flex = '';
        vistas3D.style.zIndex = '';

        vistas2D.style.position = '';
        vistas2D.style.top = '';
        vistas2D.style.right = '';
        vistas2D.style.width = '';
        vistas2D.style.height = '';
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

export function newPoint(){
    const coordX = +document.getElementById('coordX').value;
    const coordY = +document.getElementById('coordY').value;
    const coordZ = +document.getElementById('coordZ').value;
    const name = document.getElementById('name').value;

    if (createPoint(-coordX, coordY, coordZ, name) != null) {
        const command = {
            action: 'create',
            type: 'point',
            parameters: {
                x: -coordX,
                y: coordY,
                z: coordZ,
                name: name
            }
        }
        addSaveStack(command);
    }

    document.getElementById('coordX').value = '';
    document.getElementById('coordY').value = '';
    document.getElementById('coordZ').value = '';
    document.getElementById('name').value = '';
}

export function newLine(){
    const point1 = findObjectByName( point1Name.value );
    const point2 = findObjectByName( point2Name.value );
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
        case 'horizontal':
            newZ = findDeviationFromAngle(2, pointAngle) + point1.position.z;
            newY = point1.position.y;
            
            if (rigthOpening) {
                newX = point1.position.x + 2;
            } else{
                newX = point1.position.x - 2;
            }

            pointTemp = createPoint(newX, newY, newZ, "", false);

            createLine(point1, pointTemp);
        break;

        case 'frontal':
            newY = findDeviationFromAngle(2, pointAngle) + point1.position.y;
            newZ = point1.position.z;
            
            if (rigthOpening) {
                newX = point1.position.x + 2;
            } else{
                newX = point1.position.x - 2;
            }

            pointTemp = createPoint(newX, newY, newZ, "", false);

            createLine(point1, pointTemp);
        break;

        case 'frontalHorizontal':
            newX = point1.position.x - 2;

            pointTemp = createPoint(newX, point1.position.y, point1.position.z, "", false);

            createLine( point1, pointTemp);
        break;

        case 'top':
            newZ = point1.position.z + 2;

            pointTemp = createPoint(point1.position.x, point1.position.y, newZ, "", false);

            createLine( point1, pointTemp);
        break;
        
        case 'vertical':
            newY = point1.position.y + 2;

            pointTemp = createPoint(point1.position.x, newY, point1.position.z, "", false);

            createLine( point1, pointTemp);
        break;

        case 'pass':
            if (phpAngle != 0) {
                if (rigthOpeningPHP) {
                    newX = point1.position.x - findDeviationFromAngle( point1.position.y, phpAngle);
                } else{
                    newX =point1.position.x + findDeviationFromAngle( point1.position.y, phpAngle);
                }
            } else {
                if (rigthOpeningPFP) {
                    newX = point1.position.x - findDeviationFromAngle( point1.position.z, pfpAngle);
                } else{
                    newZ =point1.position.x + findDeviationFromAngle( point1.position.z, pfpAngle);
                }
            }

                pointTemp = createPoint(newX, 0, 0, '', false);
                createLine( point1, pointTemp);
        break;

        case 'oblique':
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

        case 'perfil':
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
                
                newX = point1.position.x;

                pointTemp = createPoint(newX, newY, newZ, '', false);
                createLine( point1, pointTemp);
            }
        break;

        case 'points':
            if (point1 != point2) {
                createLine( point1, point2);
            }
        break;
        default:
        break;
    }
    switch (menuLine) {
        case 'points':
            command = {
                action: 'create',
                type: 'line',
                parameters:{
                    point1: {
                        name: point1.name
                    },
                    point2: {
                        name: point2.name
                    }
                }
            }
            addSaveStack(command);
        break;
        default:
            let command = {
                action: 'create',
                type: 'line',
                parameters:{
                    point1: {
                        name: point1.name
                    },
                    point2: {
                        name: '',
                        x: pointTemp.position.x,
                        y: pointTemp.position.y,
                        z: pointTemp.position.z,
                    }
                }
            }
            addSaveStack(command);
        break;
    }
}

export function newPlane() {
    const object1Type = object1PlaneType.value;
    const object2Type = object2PlaneType.value;
    const object3Type = object3PlaneType.value;

    const object1Original = findObjectByName(object1PlaneName.value);
    const object2Original = findObjectByName(object2PlaneName.value);
    const object3Original = findObjectByName(object3PlaneName.value);

    let object1, object2, object3, objectTemp1, objectTemp2;

    if (object1Type == 'point') {
        object1 = object1Original;
    } else if (object1Type == 'line') {
        object1 = object1Original.geoChild[0];
        object2 = object1Original.geoChild[1];
    }

    // Transformar as rectas em pontos

    switch (menuPlane) {
        case 'frontal':
            if (object1Type == 'point') {
                objectTemp1 = createPoint(object1.position.x + 2, object1.position.y + 2, object1.position.z, '', false);
                objectTemp2 = createPoint(object1.position.x - 2, object1.position.y + 2, object1.position.z, '', false);
                createPlane(object1, objectTemp1, objectTemp2);
            } else if (object1Type == 'line'){
                if (object1.position.x == object2.position.x) {
                    objectTemp1 = createPoint(
                        object1.position.x - 2,
                        3 * (object1.position.y + object2.position.y) / 4,
                        object1.position.z, '', false);
                } else {
                    objectTemp1 = createPoint(
                        (object1.position.x - object2.position.x) / 2,
                        3 * (object1.position.y + object2.position.y) / 4,
                        object1.position.z, '', false);
                }
                createPlane(object1, object2, objectTemp1);
            }
        break;
        case 'horizontal':
            if (object1Type == 'point') {
                objectTemp1 = createPoint(object1.position.x + 2, object1.position.y, object1.position.z + 2, '', false);
                objectTemp2 = createPoint(object1.position.x - 2, object1.position.y, object1.position.z + 2, '', false);
                createPlane(object1, objectTemp1, objectTemp2);
            } else if (object1Type == 'line'){
                if (object1.position.x == object2.position.x) {
                    objectTemp1 = createPoint(
                        object1.position.x - 2,
                        object1.position.y,
                        3 * (object1.position.z + object2.position.z) / 4, '', false);
                } else {
                    objectTemp1 = createPoint(
                        (object1.position.x - object2.position.x) / 2,
                        object1.position.y,
                        3 * (object1.position.z + object2.position.z) / 4, '', false);
                }
                createPlane(object1, object2, objectTemp1);
            }
        break;
        case 'perfil':
            if (object1Type == 'point') {
                objectTemp1 = createPoint(object1.position.x, object1.position.y + 2, object1.position.z + 2, '', false);
                objectTemp2 = createPoint(object1.position.x, object1.position.y - 2, object1.position.z + 2, '', false);
                createPlane(object1, objectTemp1, objectTemp2);
            } else if (object1Type == 'line') {
                objectTemp1 = createPoint(
                    object1.position.x,
                    3 * (object1.position.y + object2.position.y) / 4,
                    3 * (object1.position.z + object2.position.z) / 4, '', false);
                createPlane(object1, object2, objectTemp1);
            }
        break;
        case 'oblique':
            break;
        case 'ramp':
            break;
        case 'top':
            break;
        case 'vertical':
            break;
        default:
            break;
    }
}

export function newIntersection( select ) {

    const lineSelect = findObjectByName(document.getElementById('objectNameNotable').value);
    let intersectionPoint;

    switch (select) {
        case 'php':
            intersectionPoint = intersection(lineSelect, horizontalPlane);
            createPoint(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z, 'H' + lineSelect.name);
        break;
        case 'pfp':
            intersectionPoint = intersection(lineSelect, verticalPlane);
            createPoint(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z, 'F' + lineSelect.name);
        break;
        case 'b13':
            intersectionPoint = intersection(lineSelect, b13);
            createPoint(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z, 'Q' + lineSelect.name);
        break;
        case 'b24':
            intersectionPoint = intersection(lineSelect, b24);
            createPoint(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z, 'I' + lineSelect.name);
        break;
        default:
            // Fazer para intersecções de objectos no geral.
            break;
    }
}

export function selectMenu(select) {

    if (menu == 0 || menu != select) {

        clearMenu();

        switch (select) {
            case 1:
            buttonPoint.style.backgroundColor = BUTTONSELECTCOLOR;
            controlsPoint.style.display = 'block';
            menu = 1;
            break;
                
            case 2:
            buttonLine.style.backgroundColor = BUTTONSELECTCOLOR;
            controlsLine.style.display = 'block';
            menu = 2;
            break;

            case 3:
            buttonPlane.style.backgroundColor = BUTTONSELECTCOLOR;
            controlsPlane.style.display = 'block';
            menu = 3;
            break;

            case 4:
            button2D.style.backgroundColor = BUTTONSELECTCOLOR;
            controls2D.style.display = 'block';
            menu = 4;
            break;

            case 5:
            button3D.style.backgroundColor = BUTTONSELECTCOLOR;
            controls3D.style.display = 'block';
            menu = 5;
            break;

            case 6:
            buttonFaq.style.backgroundColor = BUTTONSELECTCOLOR;
            controlsFaq.style.display = 'block';
            menu = 6;
            break;

            case 7:
                buttonFile.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFile.style.display = 'block';
                menu = 7;
            break;
            
            default:
            break;
        }
    } else {

        clearMenu();

        menu = 0;
    }
}

export function selectMenuFile ( select ){
    if (menuFile == 'none' || menuFile != select){

        clearMenuFile();

        switch (select) {
            case 'save':
                buttonFileMenuSave.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFileSave.style.display = 'block';
                menuFile = select;
            break;
            case 'load':
                buttonFileMenuLoad.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFileLoad.style.display = 'block';
                menuFile = select;
            break;
            case 'clear':
                clearAllScenes();
                menuFile = 'none';
            default:
                break;
        }

    } else {
        clearMenuFile();
        menuFile = 'none';
    }
}



export function selectMenuPoint( select ){
    if (menuPoint == 0 || menuPoint != select) {
        
        clearMenuPoint();

        switch (select) {
            case 1:
                buttonPointNew.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPointNew.style.display = 'block';
                menuPoint = select;
            break;
            case 2:
                buttonPointIntersection.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPointIntersection.style.display = 'block';
                menuPoint = select;
            break;
            case 3:
                buttonPointNotable.style.backgroundColor = BUTTONSELECTCOLOR;
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
    if (menuLine == 'none' || menuLine != select) {

        clearMenuLine();

        switch (select) {
            case 'horizontal':
                buttonLineLevel.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 'frontal':
                buttonLineFrontal.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 'frontalHorizontal':
                buttonLineFrontoHorizontal.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 'top':
                buttonLineTopo.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 'vertical':
                buttonLineVertical.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menuLine = select;
            break;
            case 'pass':
                buttonLinePass.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                menuLine = select;
            break;
            case 'oblique':
                buttonLineOblique.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                menuLine = select;
            break;
            case 'perfil':
                buttonLinePerfil.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                menuLine = select;
            break;
            case 'points':
                buttonLinePoint.style.backgroundColor = BUTTONSELECTCOLOR;
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
        menuLine = 'none';
    }
}

export function selectMenuPlane( select ) {
    if (menuPlane == 'none' || menuPlane != select) {
        clearMenuPlane();

        controlsPlaneMenu.style.display = 'block';

        switch (select) {
            case 'horizontal':
                buttonPlaneHorizontal.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                menuPlane = select;
            break;
            case 'frontal':
                buttonPlaneFrontal.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                menuPlane = select;
            break;
            case 'oblique':
                buttonPlaneOblique.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                object3Plane.style.display = 'inline';
                menuPlane = select;
            break;
            case 'perfil':
                buttonPlanePerfil.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                menuPlane = select;
            break;
            case 'ramp':
                buttonPlaneRamp.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                spanPlaneAnglePHP.style.display = 'inline';
                spanPlaneAnglePFP.style.display = 'inline';
                menuPlane = select;
            break;
            case 'top':
                buttonPlaneTop.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                spanPlaneAnglePHP.style.display = 'inline';
                spanPlaneAnglePFP.style.display = 'inline';
                menuPlane = select;
            break;
            case 'vertical':
                buttonPlaneVertical.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                spanPlaneAnglePHP.style.display = 'inline';
                spanPlaneAnglePFP.style.display = 'inline';
                menuPlane = select;
            break;
            case 'lines':
                buttonPlaneLines.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                menuPlane = select;
            break;
            case 'linePoint':
                buttonPlaneLinePoint.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                menuPlane = select;
            break;
            case 'points':
                buttonPlanePoints.style.background = BUTTONSELECTCOLOR;
                controlsPlanePoints.style.display = 'inline';
                menuPlane = select;
            break;
            
            default:
            break;
        }
    } else {
        clearMenuPlane();
        menuPlane = 'none';
    }
}

function clearMenu(){
    buttonFile.style.backgroundColor = '';
    buttonPoint.style.backgroundColor = '';
    buttonLine.style.backgroundColor = '';
    buttonPlane.style.backgroundColor = '';
    button3D.style.backgroundColor = '';
    button2D.style.backgroundColor = '';
    buttonFaq.style.backgroundColor = '';

    controlsFile.style.display = 'none';
    controlsPoint.style.display = 'none';
    controlsLine.style.display = 'none';
    controlsPlane.style.display = 'none';
    controls2D.style.display = 'none';
    controls3D.style.display = 'none';
    controlsFaq.style.display = 'none';

    clearMenuLine();
    clearMenuPlane();
    clearMenuPoint();
    clearMenuFile();

    menuLine = 0;
    menuPlane = 0;
    menuPoint = 0;
    menuFile = 'none';
}

function clearMenuFile() {
    buttonFileMenuLoad.style.backgroundColor = '';
    buttonFileMenuSave.style.backgroundColor = '';
    
    controlsFileSave.style.display = 'none';
    controlsFileLoad.style.display = 'none';
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
    buttonPlaneHorizontal.style.backgroundColor = '';
    buttonPlaneFrontal.style.backgroundColor = '';
    buttonPlaneOblique.style.backgroundColor = '';
    buttonPlanePerfil.style.backgroundColor = '';
    buttonPlaneRamp.style.backgroundColor = '';
    buttonPlaneTop.style.backgroundColor = '';
    buttonPlaneVertical.style.backgroundColor = '';
    buttonPlaneLines.style.backgroundColor = '';
    buttonPlaneLinePoint.style.backgroundColor = '';
    buttonPlanePoints.style.backgroundColor = '';

    controlsPlanePoints.style.display = 'none';
    controlsPlaneMenu.style.display = 'none';

    object1Plane.style.display = 'none';
    object2Plane.style.display = 'none';
    object3Plane.style.display = 'none';
    spanPlaneAnglePHP.style.display = 'none';
    spanPlaneAnglePFP.style.display = 'none';
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
            inputObject.onfocus = showExistingLineList(input);
        break;
        case "plane":
            // inputObject.onfocus = showExistingPlaneList;
        break;
    
        default:
            break;
    }
}