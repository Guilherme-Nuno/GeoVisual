import {
    buttonFile, buttonPoint, buttonLine, buttonPlane,
    button3D, button2D, buttonFaq, controlsFile, controlsPoint,
    controlsLine, controlsPlane, controls2D, controls3D, controlsFaq,
    buttonFileMenuLoad, buttonFileMenuSave, controlsFileSave, controlsFileLoad,
    buttonPointNew, buttonPointIntersection, buttonPointNotable,
    controlsPointNew, controlsPointIntersection, controlsPointNotable,
    buttonLineFrontal, buttonLineFrontoHorizontal, buttonLineLevel,
    buttonLineOblique, buttonLinePass, buttonLinePerfil, buttonLinePoint,
    buttonLineTopo, buttonLineVertical, controlsLinePoint,
    spanPoint1Name, spanAngle, spanAnglePFP, spanAnglePHP, spanPoint2Name,
    buttonPlaneFrontal, buttonPlaneHorizontal, buttonPlaneLinePoint,
    buttonPlaneLines, buttonPlaneOblique, buttonPlanePerfil, buttonPlanePoints,
    buttonPlaneRamp, buttonPlaneTop, buttonPlaneVertical,
    controlsPlaneMenu, controlsPlanePoints,
    object1Plane, object2Plane, object3Plane, spanPlaneAnglePFP, spanPlaneAnglePHP,
    button2DHexagon, button2DOctagon, button2DPentagon, button2DRectangle,
    button2DTriangle, controls2DMenu
 } from "./interface.js";

export class Menu {
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
        // button3D.style.backgroundColor = '';
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

    clearMenuPoint() {
        buttonPointNew.style.backgroundColor = '';
        // buttonPointIntersection.style.backgroundColor = '';
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