import * as THREE from "three";
import { drawCanvasTexture } from "./canvas";
import { randomInt } from "./functions";

const tileColor1_1 = "#DDDED8";
const tileColor1_2 = "#C2CCC3";
const tileColor2_1 = "#9999FF";
const tileColor2_2 = "#8888FF";

const tileTexture1 = drawCanvasTexture(64, 64, ctx => {
    ctx.fillStyle = tileColor1_2;
    ctx.fillRect(0, 0, 64, 64);

    ctx.fillStyle = tileColor1_1;
    for (let x = 0; x < 8; x++)
        for (let y = 0; y < 8; y++)
            ctx.fillRect(x * 8 + 1, y * 8 + 1, 6, 6);
});
const tileTexture2 = drawCanvasTexture(64, 64, ctx => {
    ctx.fillStyle = tileColor2_2;
    ctx.fillRect(0, 0, 64, 64);

    ctx.fillStyle = tileColor2_1;
    for (let x = 0; x < 8; x++)
        for (let y = 0; y < 8; y++)
            ctx.fillRect(x * 8 + 1, y * 8 + 1, 6, 6);
});
const waterTexture = drawCanvasTexture(64, 64, ctx => {
    ctx.fillStyle = "#0099ff";
    ctx.fillRect(0, 0, 64, 64);

    ctx.fillStyle = "#00bbff";
    for (let i = 0; i < 256; i++)
        ctx.fillRect(randomInt(0, 63), randomInt(0, 63), 1, 1);
});
const glassTexture1 = drawCanvasTexture(64, 64, ctx => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 64, 64);
    ctx.clearRect(2, 2, 60, 60);
});

export function createTileRectangle(x: number, y: number, w: number, h: number) {
    const texture = tileTexture1.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(w / 2, h / 2);

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(createRectangle(w, h), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.position.set(x, 0, y);

    return mesh;
}

function createRectangle(w: number, h: number) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
        0, 0, 0,
        w, 0, 0,
        w, 0, h,
        0, 0, h,
    ]), 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ]), 2));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array([
        0, 2, 1, 0, 3, 2,
    ]), 1));

    geometry.computeVertexNormals();
    geometry.computeTangents();
    geometry.normalizeNormals();

    return geometry;
}

export function createTileRectangleFromPoints(points: number[], repeatX: number, repeatY: number) {
    const texture = tileTexture2.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

export function createWaterRectangleFromPoints(points: number[], repeatX: number, repeatY: number) {
    const texture = waterTexture.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.FrontSide,
        opacity: 0.5,
        transparent: true
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);

    return mesh;
}

export function createWallRectangleFromPoints(points: number[]) {
    const material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

export function createWallRectangle3FromPoints(points: number[]) {
    const material = new THREE.MeshPhongMaterial({
        color: 0x777777,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

export function createWallRectangle4FromPoints(points: number[]) {
    const material = new THREE.MeshPhongMaterial({
        color: 0x555555,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

export function createWallRectangle6FromPoints(points: number[]) {
    const material = new THREE.MeshPhongMaterial({
        color: 0xDDDDDD,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

// const wallTexture2 = drawCanvasTexture(40, 20, ctx => {
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, 40, 20);

//     ctx.fillStyle = "#0099ff";
//     ctx.fillRect(5, 12, 14, 5);
//     ctx.fillRect(22, 12, 14, 5);

//     ctx.fillStyle = "#111155";
//     ctx.fillRect(5, 0, 14, 8);
//     ctx.fillRect(22, 0, 14, 8);
// });
// export function createWallRectangle2FromPoints(points: number[]) {
//     const material = new THREE.MeshPhongMaterial({
//         map: wallTexture2,
//         side: THREE.FrontSide,
//         shadowSide: THREE.DoubleSide
//     });

//     const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
//     mesh.receiveShadow = true;
//     mesh.castShadow = true;

//     return mesh;
// }

const wallTexture2 = drawCanvasTexture(40, 20, ctx => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 40, 20);

    ctx.clearRect(5, 12, 14, 5);
    ctx.clearRect(22, 12, 14, 5);
    ctx.clearRect(5, 0, 14, 8);
    ctx.clearRect(22, 0, 14, 8);
});
export function createWallRectangle2FromPoints(points: number[]) {
    // const material = new THREE.MeshPhongMaterial({
    //     map: wallTexture2,
    //     side: THREE.FrontSide,
    //     shadowSide: THREE.DoubleSide
    // });
    const material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        alphaMap: wallTexture2,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.5
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

const wallTexture3 = drawCanvasTexture(40, 20, ctx => {
    ctx.fillStyle = "#333366";
    ctx.fillRect(5, 12, 14, 5);
    ctx.fillRect(22, 12, 14, 5);
    ctx.fillRect(5, 0, 14, 8);
    ctx.fillRect(22, 0, 14, 8);
});
export function createWallRectangle5FromPoints(points: number[]) {
    const material = new THREE.MeshPhongMaterial({
        map: wallTexture3,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

export function createGlassRectangleFromPoints(points: number[], repeatX: number, repeatY: number) {
    const texture = glassTexture1.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);

    const material = new THREE.MeshPhongMaterial({
        color: 0xAAAAAA,
        alphaMap: texture,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.5
    });

    const mesh = new THREE.Mesh(createRectangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

function createRectangleFromPoints(points: number[]) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
        points[0], points[1], points[2],
        points[3], points[4], points[5],
        points[6], points[7], points[8],
        points[9], points[10], points[11],
    ]), 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ]), 2));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array([
        0, 2, 1, 0, 3, 2,
    ]), 1));
    geometry.computeVertexNormals();

    return geometry;
}

//Triangles
export function createGlassTriangleFromPoints(points: number[], repeatX: number, repeatY: number) {
    const texture = glassTexture1.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);

    const material = new THREE.MeshPhongMaterial({
        color: 0xAAAAAA,
        alphaMap: texture,
        side: THREE.FrontSide,
        shadowSide: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.5
    });

    const mesh = new THREE.Mesh(createTriangleFromPoints(points), material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

function createTriangleFromPoints(points: number[]) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
        points[0], points[1], points[2],
        points[3], points[4], points[5],
        points[6], points[7], points[8],
    ]), 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ]), 2));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array([
        0, 1, 2,
    ]), 1));
    geometry.computeVertexNormals();

    return geometry;
}

export function createBox(x: number, y: number, z: number, w: number, h: number, d: number) {
    const material = new THREE.MeshPhongMaterial({
        color: 0xCCCCCC,
        side: THREE.FrontSide,
        shadowSide: THREE.FrontSide
    });

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x + w / 2, y + h / 2, z + d / 2);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}
