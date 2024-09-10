import { b13, b24, linesB13, linesB24 } from "../main.js";
import { existingPointList, existingLineList, existingPlaneList, pointNamesList } from "../utils/nameLists.js";

class Menu {
    constructor(){
        this.windowMaximized = false;
        this.showBisector = false;
        this.main = 'none';
        this.file = 'none';
        this.line = 'none';
        this.plane = 'none';
        this.point = 'none';
        this.m2D = 'none';
    }

    clearMenu() {
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

        this.clearMenuLine();
        this.clearMenuPlane();
        this.clearMenuPoint();
        this.clearMenuFile();
        this.clearMenu2D();

        this.line = 'none';
        this.plane = 'none';
        this.point = 'none';
        this.file = 'none';
        this.m2D = 'none';
    }

    clearMenuFile() {
        buttonFileMenuLoad.style.backgroundColor = '';
        buttonFileMenuSave.style.backgroundColor = '';
        
        controlsFileSave.style.display = 'none';
        controlsFileLoad.style.display = 'none';
    }

    clearMenuLine() {
        buttonFileMenuLoad.style.backgroundColor = '';
        buttonFileMenuSave.style.backgroundColor = '';
        
        controlsFileSave.style.display = 'none';
        controlsFileLoad.style.display = 'none';
    }

    clearMenuPoint() {
        buttonPointNew.style.backgroundColor = '';
        buttonPointIntersection.style.backgroundColor = '';
        buttonPointNotable.style.backgroundColor = '';
    
        controlsPointNew.style.display = 'none';
        controlsPointIntersection.style.display = 'none';
        controlsPointNotable.style.display = 'none';
    }

    clearMenuLine(){
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

    clearMenuPlane() { 
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

    clearMenu2D(){
        button2DTriangle.style.backgroundColor = '';
        button2DRectangle.style.backgroundColor = '';
        button2DPentagon.style.backgroundColor = '';
        button2DHexagon.style.backgroundColor = '';
        button2DOctagon.style.backgroundColor = '';
    
        controls2DMenu.style.display = 'none';
    }
}

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

//Construct new menu object
export const menu = new Menu();

// First menu
export const buttonFile = document.getElementById("buttonFile");
export const buttonPoint = document.getElementById("button_point");
export const buttonLine = document.getElementById("button_line");
export const buttonPlane = document.getElementById("button_plane");
export const button2D = document.getElementById("button_2D");
export const button3D = document.getElementById("button_3D");
export const buttonFaq = document.getElementById("button_faq");

export const controlsFile = document.getElementById("controlsFile");
export const controlsPoint = document.getElementById("controls_point");
export const controlsLine = document.getElementById("controls_line");
export const controlsPlane = document.getElementById("controls_plane");
export const controls2D = document.getElementById("controls_2D");
export const controls3D = document.getElementById("controls_3D");
export const controlsFaq = document.getElementById("controls_faq");

// File menu
export const controlsFileSave = document.getElementById("controlsFileSave");
export const controlsFileLoad = document.getElementById("controlsFileLoad");

export const buttonFileMenuSave = document.getElementById("buttonFileMenuSave");
export const buttonFileMenuLoad = document.getElementById("buttonFileMenuLoad");
export const buttonFileSave = document.getElementById("buttonFileSave");
export const buttonFileLoad = document.getElementById("buttonFileLoad");

// Point menu
export const buttonPointNew = document.getElementById("buttonPointNew");
export const buttonPointIntersection = document.getElementById("buttonPointIntersection");
export const buttonPointNotable = document.getElementById("buttonPointNotable");

export const controlsPointNew = document.getElementById("controls_point_new");
export const controlsPointIntersection = document.getElementById("controlsPointIntersection");
export const controlsPointNotable = document.getElementById("controlsPointNotable");

// Line menu
export const buttonLineLevel = document.getElementById("button_line_level");
export const buttonLinePoint = document.getElementById("buttonLinePoint");
export const buttonLineFrontal = document.getElementById("button_line_frontal");
export const buttonLineFrontoHorizontal = document.getElementById("button_line_frontoHorizontal");
export const buttonLineTopo = document.getElementById("button_line_topo");
export const buttonLineVertical = document.getElementById("button_line_vertical");
export const buttonLinePass = document.getElementById("button_line_pass");
export const buttonLineOblique = document.getElementById("button_line_oblique");
export const buttonLinePerfil = document.getElementById("button_line_perfil");

export const spanPoint1Name = document.getElementById("spanPoint1Name");
export const spanPoint2Name = document.getElementById("spanPoint2Name");
export const spanAngle = document.getElementById("spanAngulo");
export const spanAnglePHP = document.getElementById("spanAnglePHP");
export const spanAnglePFP = document.getElementById("spanAnglePFP");

export const controlsLinePoint = document.getElementById("controlsLinePoint");
export const point1Name = document.getElementById("point1Name");
export const point2Name = document.getElementById("point2Name");
export const angle = document.getElementById("angulo");
export const anglePHP = document.getElementById("anglePHP");
export const anglePFP = document.getElementById("anglePFP");
export const angleSelect = document.getElementById("angleSelect");
export const phpSelect = document.getElementById("phpSelect");
export const pfpSelect = document.getElementById("pfpSelect");

// Plane menu
export const buttonPlanePoints = document.getElementById("buttonPlanePoints");
export const buttonPlaneHorizontal = document.getElementById("buttonPlaneHorizontal");
export const buttonPlaneFrontal = document.getElementById("buttonPlaneFrontal");
export const buttonPlaneOblique = document.getElementById("buttonPlaneOblique");
export const buttonPlanePerfil = document.getElementById("buttonPlanePerfil");
export const buttonPlaneRamp = document.getElementById("buttonPlaneRamp");
export const buttonPlaneTop = document.getElementById("buttonPlaneTop");
export const buttonPlaneVertical = document.getElementById("buttonPlaneVertical");
export const buttonPlaneLines = document.getElementById("buttonPlaneLines");
export const buttonPlaneLinePoint = document.getElementById("buttonPlaneLinePoint");

export const controlsPlaneMenu = document.getElementById("controlsPlaneMenu");

export const object1Plane = document.getElementById("object1Plane");
export const object1PlaneType = document.getElementById("object1PlaneType");
export const object1PlaneName = document.getElementById("object1PlaneName");

export const object2Plane = document.getElementById("object2Plane");
export const object2PlaneType = document.getElementById("object2PlaneType");
export const object2PlaneName = document.getElementById("object2PlaneName");

export const object3Plane = document.getElementById("object3Plane");
export const object3PlaneType = document.getElementById("object3PlaneType");
export const object3PlaneName = document.getElementById("object3PlaneName");

export const spanPlaneAnglePHP = document.getElementById("spanPlaneAnglePHP");
export const planeAnglePHP = document.getElementById("planeAnglePHP");
export const planePhpSelect = document.getElementById("planePhpSelect");

export const spanPlaneAnglePFP = document.getElementById("spanPlaneAnglePFP");
export const planeAnglePFP = document.getElementById("planeAnglePFP");
export const planePfpSelect = document.getElementById("planePfpSelect");

export const controlsPlanePoints = document.getElementById("controlsPlanePoints");

// Shape menu
export const button2DTriangle = document.getElementById("button2DTriangle");
export const button2DRectangle = document.getElementById("button2DRectangle");
export const button2DPentagon = document.getElementById("button2DPentagon");
export const button2DHexagon = document.getElementById("button2DHexagon");
export const button2DOctagon = document.getElementById("button2DOctagon");

export const controls2DMenu = document.getElementById("controls2DMenu");

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

export function showExistingPlaneList(elementId) {
    const selectElement = document.getElementById(elementId);

    while (selectElement.firstChild) selectElement.removeChild(selectElement.firstChild);

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Plano';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectElement.appendChild(placeholderOption);

    existingPlaneList.forEach(name => {
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

    if(!menu.windowMaximized){
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

        menu.windowMaximized = true;

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

        menu.windowMaximized = false;
    }
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