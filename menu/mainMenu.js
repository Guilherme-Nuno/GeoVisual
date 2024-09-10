import { 
    menu,
    buttonPoint, controlsPoint,
    buttonLine, controlsLine,
    buttonPlane, controlsPlane,
    button2D, controls2D,
    button3D, controls3D,
    buttonFaq, controlsFaq,
    buttonFile, controlsFile
 } from './interface.js';
 import { BUTTONSELECTCOLOR } from '../main.js';
 

export function selectMenu(select) {

    if (menu.main == 0 || menu.main != select) {

        menu.clearMenu();

        switch (select) {
            case 1:
                buttonPoint.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPoint.style.display = 'block';
                menu.main = 1;
            break;
                
            case 2:
                buttonLine.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsLine.style.display = 'block';
                menu.main = 2;
            break;

            case 3:
                buttonPlane.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsPlane.style.display = 'block';
                menu.main = 3;
            break;

            case 4:
                button2D.style.backgroundColor = BUTTONSELECTCOLOR;
                controls2D.style.display = 'block';
                menu.main = 4;
            break;

            case 5:
                button3D.style.backgroundColor = BUTTONSELECTCOLOR;
                controls3D.style.display = 'block';
                menu.main = 5;
            break;

            case 6:
                buttonFaq.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFaq.style.display = 'block';
                menu.main = 6;
            break;

            case 7:
                buttonFile.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFile.style.display = 'block';
                menu.main = 7;
            break;
            
            default:
            break;
        }
    } else {

        menu.clearMenu();

        menu.main = 0;
    }
}
