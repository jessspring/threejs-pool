import * as THREE from "three";

export function drawCanvasTexture(w: number, h: number, drawFunction: (context: CanvasRenderingContext2D) => void) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    drawFunction(canvas.getContext("2d") as CanvasRenderingContext2D);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    return texture;
}
