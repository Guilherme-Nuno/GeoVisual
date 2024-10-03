import { 
    menu,
    buttonPlaneHorizontal, buttonPlaneFrontal,
    buttonPlaneOblique, buttonPlanePerfil,
    buttonPlaneRamp, buttonPlaneTop,
    buttonPlaneVertical, buttonPlaneLines,
    buttonPlaneLinePoint, buttonPlanePoints,
    controlsPlaneMenu,
    object1Plane, object2Plane, object3Plane,
    spanPlaneAnglePFP, spanPlaneAnglePHP,
    controlsPlanePoints,
    object1PlaneName, object2PlaneName, object3PlaneName,
    object1PlaneType, object2PlaneType, object3PlaneType,
    planeAnglePFP, planeAnglePHP,
 } from './interface.js';
import { createPoint } from '../create/point.js';
import { findDeviationFromAngle } from "../utils/calculations.js";
import { createPlane } from "../create/plane.js";
import { findObjectByName } from '../main.js';
import { BUTTONSELECTCOLOR } from '../main.js';
import { addSaveStack } from '../utils/fileUtils.js';

export function selectMenuPlane( select ) {
    if (menu.plane == 'none' || menu.plane != select) {
        menu.clearMenuPlane();

        controlsPlaneMenu.style.display = 'block';

        switch (select) {
            case 'horizontal':
                buttonPlaneHorizontal.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                menu.plane = select;
            break;
            case 'frontal':
                buttonPlaneFrontal.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                menu.plane = select;
            break;
            case 'oblique':
                buttonPlaneOblique.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                object3Plane.style.display = 'inline';
                menu.plane = select;
            break;
            case 'perfil':
                buttonPlanePerfil.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                menu.plane = select;
            break;
            case 'ramp':
                buttonPlaneRamp.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                spanPlaneAnglePHP.style.display = 'inline';
                spanPlaneAnglePFP.style.display = 'inline';
                menu.plane = select;
            break;
            case 'top':
                buttonPlaneTop.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                spanPlaneAnglePHP.style.display = 'inline';
                spanPlaneAnglePFP.style.display = 'inline';
                menu.plane = select;
            break;
            case 'vertical':
                buttonPlaneVertical.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                spanPlaneAnglePHP.style.display = 'inline';
                spanPlaneAnglePFP.style.display = 'inline';
                menu.plane = select;
            break;
            case 'lines':
                buttonPlaneLines.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                menu.plane = select;
            break;
            case 'linePoint':
                buttonPlaneLinePoint.style.backgroundColor = BUTTONSELECTCOLOR;
                object1Plane.style.display = 'inline';
                object2Plane.style.display = 'inline';
                menu.plane = select;
            break;
            case 'points':
                buttonPlanePoints.style.background = BUTTONSELECTCOLOR;
                controlsPlanePoints.style.display = 'inline';
                menu.plane = select;
            break;
            
            default:
            break;
        }
    } else {
        menu.clearMenuPlane();
        menu.plane = 'none';
    }
}

export function newPlane() {
    const object1Type = object1PlaneType.value;
    const object2Type = object2PlaneType.value;
    const object3Type = object3PlaneType.value;

    const object1Original = findObjectByName(object1PlaneName.value);
    const object2Original = findObjectByName(object2PlaneName.value);
    const object3Original = findObjectByName(object3PlaneName.value);

    const anglePHP = +planeAnglePHP.value;
    const anglePFP = +planeAnglePFP.value;

    let object1, object2, object3, objectTemp1, objectTemp2, planeCreated;

    let typeCheck = object1Type + object2Type + object3Type;

    if (anglePHP != 0) {
        typeCheck = typeCheck + 'php';
    }

    if (anglePFP != 0) {
        typeCheck = typeCheck + 'pfp';
    }

    switch (typeCheck) {
        case 'point':
        case 'pointpfp':
        case 'pointphp':
            object1 = object1Original;
            break;
        case 'pointpoint':
            object1 = object1Original;
            object2 = object2Original;
            break;
        case 'pointpointpoint':
            object1 = object1Original;
            object2 = object2Original;
            object3 = object3Original;
            break;
        case 'line':
            object1 = object1Original.geoChild[0];
            object2 = object1Original.geoChild[1];
            break;
        case 'linepoint':
            object1 = object1Original.geoChild[0];
            object2 = object1Original.geoChild[1];
            object3 = object2Original;
            break;
        case 'lineline':
            object1 = object1Original.geoChild[0];
            object2 = object1Original.geoChild[1];
            object3 = object2Original.geChild[0];
            break;
        default:
            break;
    }

    switch (menu.plane) {
        case 'frontal':
            switch (typeCheck) {
                case 'point':
                    objectTemp1 = createPoint(object1.position.x + 2, object1.position.y + 2, object1.position.z, '', false);
                    objectTemp2 = createPoint(object1.position.x - 2, object1.position.y + 2, object1.position.z, '', false);
                    planeCreated = createPlane(object1, objectTemp1, objectTemp2);
                    break;
                case 'line':
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
                    planeCreated = createPlane(object1, object2, objectTemp1);
                    break;
                default:
                    break;
            }
            break;
        case 'horizontal':
            switch (typeCheck) {
                case 'point':
                    objectTemp1 = createPoint(object1.position.x + 2, object1.position.y, object1.position.z + 2, '', false);
                    objectTemp2 = createPoint(object1.position.x - 2, object1.position.y, object1.position.z + 2, '', false);
                    planeCreated = createPlane(object1, objectTemp1, objectTemp2);
                    break;
                case 'line':
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
                    planeCreated = createPlane(object1, object2, objectTemp1);
                    break;
                default:
                    break;
            }
            break;
        case 'perfil':
            switch (typeCheck) {
                case 'point':
                    objectTemp1 = createPoint(object1.position.x, object1.position.y + 2, object1.position.z + 2, '', false);
                    objectTemp2 = createPoint(object1.position.x, object1.position.y - 2, object1.position.z + 2, '', false);
                    planeCreated = createPlane(object1, objectTemp1, objectTemp2);
                    break;
                case 'line':
                    objectTemp1 = createPoint(
                        object1.position.x,
                        3 * (object1.position.y + object2.position.y) / 4,
                        3 * (object1.position.z + object2.position.z) / 4, '', false);
                    planeCreated = createPlane(object1, object2, objectTemp1);
                    break;
                default:
                    break;
            }
            break;
        case 'oblique':
            switch (typeCheck) {
                case 'pointpointpoint':
                    planeCreated = createPlane(object1, object2, object3);
                    break;
                case 'lineline':
                    planeCreated = createPlane(object1, object2, object3);
                    break;
                case 'linepoint':
                    planeCreated = createPlane(object1, object2, object3);
                    break;
                case 'pointphp':
                    // Create
                    break;
                case 'pointpfp':
                    // Create
                    break;
                default:
                    break;
            }
            break;
        case 'ramp':
            switch (typeCheck) {
                case 'pointpoint':
                case 'line':
                    objectTemp1 = createPoint(object1.position.x + 2, object1.position.y, object1.position.z, '',false);
                    planeCreated = createPlane(object1, object2, objectTemp1);
                    break;
                case 'pointphp':
                    // Create                    
                    break;
                case 'pointpfp':
                    // Create                    
                    break;
                default:
                    break;
            }
            break;
        case 'top':
            switch (typeCheck) {
                case 'pointpoint':
                case 'line':
                    objectTemp1 = createPoint(object1.position.x, object1.position.y, object1.position.z + 2, '',false);
                    planeCreated = createPlane(object1, object2, objectTemp1);
                    break;
                case 'pointphp':
                    objectTemp1 = createPoint(
                        object1.position.x + 2,
                        object1.position.y + findDeviationFromAngle( 2, anglePHP),
                        object1.position.z, '', false
                    );
                    objectTemp2 = createPoint(
                        object1.position.x + 1,
                        object1.position.y + findDeviationFromAngle( 1, anglePHP),
                        object1.position.z + 2, '', false
                    );
                    planeCreated = createPlane(object1, objectTemp1, objectTemp2);
                    break;
                default:
                    break;
            }
            break;
        case 'vertical':
            switch (typeCheck) {
                case 'pointpoint':
                case 'line': 
                    objectTemp1 = createPoint(object1.position.x, object1.position.y + 2, object1.position.z, '',false);
                    planeCreated = createPlane(object1, object2, objectTemp1);                  
                    break;
                case 'pointpfp':
                    objectTemp1 = createPoint(
                        object1.position.x + 2,
                        object1.position.y,
                        object1.position.z + findDeviationFromAngle( 2, anglePFP), '', false
                    );
                    objectTemp2 = createPoint(
                        object1.position.x + 1,
                        object1.position.y + 2,
                        object1.position.z + findDeviationFromAngle( 1, anglePFP), '', false
                    );
                    planeCreated = createPlane(object1, objectTemp1, objectTemp2);
                    break;
                default:
                    break;
            }
            break;
        case 'points':
            switch (typeCheck) {
                case 'pointpointpoint':
                    object1 = object1Original;
                    object2 = object2Original;
                    object3 = object3Original;
                    planeCreated = createPlane(object1, object2, object3);
                    break;
            default:
                break;
            }
            break;
        default:
            break;
    }

    // Creating object for save file
    let command;

    if (planeCreated != null) {
        switch (typeCheck) {
            case 'point':
            case 'pointpfp':
            case 'pointphp':
                command = {
                    action: 'create',
                    type: 'plane',
                    name: planeCreated.name,
                    parameters: {
                        object1: {
                            type: 'point',
                            name: object1Original.name
                        },
                        object2: {
                            type: 'none',
                            x: objectTemp1.position.x,
                            y: objectTemp1.position.y,
                            z: objectTemp1.position.z,
                        },
                        object3:{
                            type: 'none',
                            x: objectTemp2.position.x,
                            y: objectTemp2.position.y,
                            z: objectTemp2.position.z,
                        }
                    }
                }    
            break;
            case 'pointpoint':
                command = {
                    action: 'create',
                    type: 'plane',
                    name: planeCreated.name,
                    parameters: {
                        object1: {
                            type: 'point',
                            name: object1Original.name
                        },
                        object2: {
                            type: 'point',
                            name: object2Original.name
                        },
                        object3:{
                            type: 'none',
                            x: objectTemp1.position.x,
                            y: objectTemp1.position.y,
                            z: objectTemp1.position.z,
                        }
                    }
                } 
            break;
            case 'pointpointpoint':
                command = {
                    action: 'create',
                    type: 'plane',
                    name: planeCreated.name,
                    parameters: {
                        object1: {
                            type: 'point',
                            name: object1Original.name
                        },
                        object2: {
                            type: 'point',
                            name: object2Original.name
                        },
                        object3:{
                            type: 'point',
                            name: object3Original.name
                        }
                    }
                }
            break;
            case 'line':
                command = {
                    action: 'create',
                    type: 'plane',
                    name: planeCreated.name,
                    parameters: {
                        object1: {
                            type: 'line',
                            name: object1Original.name
                        },
                        object2: {
                            type: 'none',
                            x: objectTemp1.position.x,
                            y: objectTemp1.position.y,
                            z: objectTemp1.position.z,
                        }
                    }
                }
            break;
            case 'linepoint':
                command = {
                    action: 'create',
                    type: 'plane',
                    name: planeCreated.name,
                    parameters: {
                        object1: {
                            type: 'line',
                            name: object1Original.name
                        },
                        object2: {
                            type: 'point',
                            name: object2Original.name
                        }
                    }
                }
            break;
            case 'lineline':
                command = {
                    action: 'create',
                    type: 'plane',
                    name: planeCreated.name,
                    parameters: {
                        object1: {
                            type: 'line',
                            name: object1Original.name
                        },
                        object2: {
                            type: 'line',
                            name: object2Original.name
                        }
                    }
                }
            break;
            default:
                break;
        }
    }

    addSaveStack(command);
}