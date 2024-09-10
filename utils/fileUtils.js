import { createLine } from '../create/line.js';
import { createPoint } from '../create/point.js';
import { findObjectByName } from '../main.js';
import { clearAllScenes } from '../main.js';

const saveStack = [];

export function addSaveStack( command ) {
    saveStack.push(command);

    console.log(saveStack);
}

function saveScene() {
    
    const jsonData = JSON.stringify(saveStack);
    return jsonData;
}

function downloadJSON(jsonData, filename) {
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

function readJSONFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        
        const scene = loadScene(fileContent);

        callback(scene);
    };
    reader.readAsText(file);
}

function loadObject( object ) {

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

    addSaveStack( object );
}

export function clearSaveStack() {
    saveStack.length = 0;
}

export function load(){
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecione um arquivo primeiro.");
        return;
    }

    readJSONFile(file, (loadedScene) => {
        clearAllScenes();

        loadedScene.forEach(loadObject);
    });
}

export function save(){
    const jsonData = saveScene( scene2d, scene3d);
    downloadJSON( jsonData, 'scene.gvis');
}