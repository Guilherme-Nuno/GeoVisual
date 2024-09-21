import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';

export function createTextLabel(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '24px Arial';
    context.fillStyle = 'black';
    context.fillText(text, 0, 24);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(3, 3, 1); 
    sprite.position.copy(position);
    sprite.translateX(1);
    sprite.translateY(-1);

    return sprite;
}

export function createLineSegment( point1, point2 ){
    const tempPoint1 = point1.clone();
    const tempPoint2 = point2.clone();

    const lineSegmentGeometry = new THREE.BufferGeometry().setFromPoints( [tempPoint1, tempPoint2] );
    const lineSegment = new THREE.LineSegments(lineSegmentGeometry, new THREE.LineBasicMaterial( {color: 'black' } ) );

    lineSegment.geoType = 'LineSegment';

    return lineSegment;
}