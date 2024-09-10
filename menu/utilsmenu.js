import { 
    menu,
    buttonFileMenuSave, controlsFileSave,
    buttonFileMenuLoad, controlsFileLoad
 } from './interface.js';
 import { clearAllScenes } from "../main.js";
 import { BUTTONSELECTCOLOR } from '../main.js';

 export function selectMenuFile ( select ){
    if (menu.file == 'none' || menu.file != select){

        menu.clearMenuFile();

        switch (select) {
            case 'save':
                buttonFileMenuSave.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFileSave.style.display = 'block';
                menu.file = select;
            break;
            case 'load':
                buttonFileMenuLoad.style.backgroundColor = BUTTONSELECTCOLOR;
                controlsFileLoad.style.display = 'block';
                menu.file = select;
            break;
            case 'clear':
                clearAllScenes();
                menu.file = 'none';
            default:
                break;
        }

    } else {
        menu.clearMenuFile();
        menu.file = 'none';
    }
}