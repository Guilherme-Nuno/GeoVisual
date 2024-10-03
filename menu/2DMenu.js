import { 
    menu,
    button2DTriangle, button2DRectangle,
    button2DPentagon, button2DHexagon,
    button2DOctagon,
    controls2DMenu
 } from './interface.js';
import { findObjectByName } from "../main.js";
import { addSaveStack } from "../utils/fileUtils.js";
import { createShape } from "../create/shape.js";
import { BUTTONSELECTCOLOR } from '../main.js';

export function selectMenu2D(select) {
    if (menu.m2D == 'none' || menu.m2D != select) {
        menu.clearMenu2D();

        switch (select) {
            case 'triangle':
                button2DTriangle.style.backgroundColor = BUTTONSELECTCOLOR;
                controls2DMenu.style.display = 'inline';
                menu.m2D = select;
            break;
            case 'rectangle':
                button2DRectangle.style.backgroundColor = BUTTONSELECTCOLOR;
                controls2DMenu.style.display = 'inline';
                menu.m2D = select;
            break;
            case 'pentagon':
                button2DPentagon.style.backgroundColor = BUTTONSELECTCOLOR;
                controls2DMenu.style.display = 'inline';
                menu.m2D = select;
            break;
            case 'hexagon':
                button2DHexagon.style.backgroundColor = BUTTONSELECTCOLOR;
                controls2DMenu.style.display = 'inline';
                menu.m2D = select;
            break;
            case 'octagon':
                button2DOctagon.style.backgroundColor = BUTTONSELECTCOLOR;
                controls2DMenu.style.display = 'inline';
                menu.m2D = select;
            break;
            default:
            break;
        }
    } else {
        menu.clearMenu2D();
        menu.m2D = 'none';
    }
}

export function newShape() {

    const center = findObjectByName(document.getElementById("menu2DPointName").value);
    const plane = findObjectByName(document.getElementById("menu2DPlaneName").value);
    const size = +document.getElementById('2DSize').value;
    let shape, sides;

    switch (menu.m2D) {
        case 'triangle':
            sides= 3;
            shape = createShape(size, sides, center.position, plane);
            break;
        case 'rectangle':
            sides = 4;
            shape = createShape(size, sides, center.position, plane);
            break;
        case 'pentagon':
            sides = 5;
            shape = createShape(size, sides, center.position, plane);
            break;
        case 'hexagon':
            sides = 6;
            shape = createShape(size, sides, center.position, plane);
            break;
        case 'octagon':
            sides = 8;
            shape = createShape(size, sides, center.position, plane);
            break;
        default:
            break;
    }

    if (shape != null) {
        let command;

        command = {
            action: 'create',
            type: 'shape',
            parameters: {
                size: size,
                sides: sides,
                center: center.name,
                plane: plane.name
            }
        };
        addSaveStack(command);
    }
}