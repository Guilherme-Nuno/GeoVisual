import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { createLine, createPoint } from './create.js';
import { findObjectByName } from './main.js';

const saveStack = [];

export function addSaveStack( command ) {
    saveStack.push(command);

    console.log(saveStack);
}

export function saveScene() {
    
    const jsonData = JSON.stringify(saveStack);
    return jsonData;
}

export function downloadJSON(jsonData, filename) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url); // Limpar a URL gerada
}

function loadScene(jsonData) {
    
    const sceneData = JSON.parse(jsonData);
    
    return sceneData;
}

export function readJSONFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        
        const scene = loadScene(fileContent);

        callback(scene);
    };
    reader.readAsText(file);
}

export function loadObject( object ) {

    let point1, point2;

    switch (object.action) {
        case 'create':
            switch (object.type) {
                case 'point':
                    createPoint(object.parameters.x, object.parameters.y, object.parameters.z, object.parameters.name);    
                break;
                case 'line':
                    point1 = findObjectByName(object.parameters.point1.name);

                    if (object.parameters.point2.name == '') {
                        point2 = createPoint(object.parameters.point2.x, object.parameters.point2.y, object.parameters.point2.z, '', false);
                    } else {
                        point2 = findObjectByName(object.parameters.point2.name);
                    }
                    createLine(point1, point2, object.name);
                break;
                default:
                break;
            }

        break;
    
        default:
            break;
    }
}