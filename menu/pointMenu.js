import { 
    menu,
    buttonPointNew, controlsPointNew,
    buttonPointIntersection, controlsPointIntersection,
    buttonPointNotable, controlsPointNotable,
 } from './interface.js';
 import { createPoint } from '../create/point.js';
 import { addSaveStack } from '../utils/fileUtils.js';
 import { intersection } from '../utils/calculations.js';
 import { BUTTONSELECTCOLOR } from '../main.js';

 export function selectMenuPoint( select ){
    if (menu.point == 'none' || menu.point != select) {
        
        menu.clearMenuPoint();

        switch (select) {
            case 1:
                buttonPointNew.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPointNew.style.display = 'block';
                menu.point = select;
            break;
            case 2:
                buttonPointIntersection.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPointIntersection.style.display = 'block';
                menu.point = select;
            break;
            case 3:
                buttonPointNotable.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPointNotable.style.display = 'block';
                menu.point = select;
            default:
            break;
        }
    } else {
        menu.clearMenuPoint();
        menu.point = 'none';
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