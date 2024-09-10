import { 
    menu,
    buttonLineLevel, controlsLinePoint,
    buttonLineFrontal, buttonLineFrontoHorizontal,
    buttonLineTopo, buttonLineVertical,
    buttonLinePass, buttonLineOblique,
    buttonLinePerfil, buttonLinePoint,
    spanPoint2Name, spanAnglePFP, spanAnglePHP, spanAngle,
    angle, anglePFP, anglePHP,
    point1Name, point2Name
 } from './interface.js';
 import { createPoint  } from '../create/point.js';
 import { createLine } from '../create/line.js';
 import { findDeviationFromAngle } from '../utils/calculations.js';
 import { findObjectByName } from '../main.js';
 import { addSaveStack } from '../utils/fileUtils.js';
 import { BUTTONSELECTCOLOR } from '../main.js';

 export function selectMenuLine( select ){
    if (menu.line == 'none' || menu.line != select) {

        menu.clearMenuLine();

        switch (select) {
            case 'horizontal':
                buttonLineLevel.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menu.line = select;
            break;
            case 'frontal':
                buttonLineFrontal.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menu.line = select;
            break;
            case 'frontalHorizontal':
                buttonLineFrontoHorizontal.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menu.line = select;
            break;
            case 'top':
                buttonLineTopo.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menu.line = select;
            break;
            case 'vertical':
                buttonLineVertical.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menu.line = select;
            break;
            case 'pass':
                buttonLinePass.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanPoint2Name.style.display = 'none';
                spanAngle.style.display = 'none';
                menu.line = select;
            break;
            case 'oblique':
                buttonLineOblique.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                menu.line = select;
            break;
            case 'perfil':
                buttonLinePerfil.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                menu.line = select;
            break;
            case 'points':
                buttonLinePoint.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLinePoint.style.display = 'block';
                spanAngle.style.display = 'none';
                spanAnglePFP.style.display = 'none';
                spanAnglePHP.style.display = 'none';
                menu.line = select;
                break;
            default:
                break;
        }
    } else {
        menu.clearMenuLine();
        menu.line = 'none';
    }
}

 export function newLine(){
    const point1 = findObjectByName( point1Name.value );
    const point2 = findObjectByName( point2Name.value );
    const pointAngle = +angle.value;
    const phpAngle = +anglePHP.value;
    const pfpAngle = +anglePFP.value;
    let rigthOpening, rigthOpeningPHP, rigthOpeningPFP;
    let lineCreated;

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

    switch (menu.line) {
        case 'horizontal':
            newZ = findDeviationFromAngle(2, pointAngle) + point1.position.z;
            newY = point1.position.y;
            
            if (rigthOpening) {
                newX = point1.position.x + 2;
            } else{
                newX = point1.position.x - 2;
            }

            pointTemp = createPoint(newX, newY, newZ, "", false);

            lineCreated = createLine(point1, pointTemp);
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

            lineCreated = createLine(point1, pointTemp);
        break;

        case 'frontalHorizontal':
            newX = point1.position.x - 2;

            pointTemp = createPoint(newX, point1.position.y, point1.position.z, "", false);

            lineCreated = createLine( point1, pointTemp);
        break;

        case 'top':
            newZ = point1.position.z + 2;

            pointTemp = createPoint(point1.position.x, point1.position.y, newZ, "", false);

            lineCreated = createLine( point1, pointTemp);
        break;
        
        case 'vertical':
            newY = point1.position.y + 2;

            pointTemp = createPoint(point1.position.x, newY, point1.position.z, "", false);

            lineCreated = createLine( point1, pointTemp);
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
                lineCreated = createLine( point1, pointTemp);
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
                lineCreated = createLine(point1, point2);
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
                lineCreated = createLine( point1, pointTemp);
            }
        break;

        case 'points':
            if (point1 != point2) {
                lineCreated = createLine( point1, point2);
            }
        break;
        default:
        break;
    }

    let command;

    // Creating object for save file
    switch (menu.line) {
        case 'points':
            if (lineCreated != null) {
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
            }
            addSaveStack(command);
        break;
        default:
            if (lineCreated != null && pointTemp != null) {
                command = {
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
            }
            addSaveStack(command);
        break;
    }
}