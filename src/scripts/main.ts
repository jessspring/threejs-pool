import * as THREE from 'three';
import * as Input from './input';
import { createSkybox } from './skybox';
import { createTileRectangle, createTileRectangleFromPoints, createWaterRectangleFromPoints, createWallRectangleFromPoints, createGlassRectangleFromPoints, createGlassTriangleFromPoints, createBox, createWallRectangle2FromPoints, createWallRectangle3FromPoints, createWallRectangle4FromPoints, createWallRectangle5FromPoints, createWallRectangle6FromPoints } from './objects';

const backgroundColor = new THREE.Color().setHex(0xffccff);

//Scene setup
const renderer = createRenderer();
const scene = createScene();
scene.add(new THREE.AmbientLight(backgroundColor, 1.2));

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const player = new THREE.CylinderGeometry(1, 1, 1);
const playerMesh = new THREE.Mesh(player, undefined);
playerMesh.position.y = 1;
playerMesh.add(camera);
scene.add(playerMesh);

//Sun light
const sunLight = new THREE.DirectionalLight(0xFFFFFF, 2);
sunLight.castShadow = true;
sunLight.position.set(-1.6, 1, 0.4);
sunLight.position.multiplyScalar(30);
sunLight.shadow.mapSize.set(4096 * 4, 4096 * 4);
sunLight.shadow.bias = -0.0001;
scene.add(sunLight);

const sunlightShadowCamera = sunLight.shadow.camera;
sunlightShadowCamera.far = 100;
sunlightShadowCamera.top = 20;
sunlightShadowCamera.right = 20;
sunlightShadowCamera.left = -30;
sunlightShadowCamera.bottom = -20;

// const lightHelper = new THREE.DirectionalLightHelper(sunLight);
// scene.add(lightHelper);
// const lightCameraHelper = new THREE.CameraHelper(sunLight.shadow.camera);
// scene.add(lightCameraHelper);

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({
    color: 0x777777,
    side: THREE.FrontSide,
}));
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

////World geometry
//Floor
scene.add(createTileRectangle(-2, -16, 6, 24));
scene.add(createTileRectangle(-12, -16, 10, 3));
scene.add(createTileRectangle(-12, -13, 3, 21));
scene.add(createTileRectangle(-12, 8, 21, 3));
scene.add(createTileRectangle(-6, -24, 10, 8));

//Pool
scene.add(createTileRectangleFromPoints([
    -9, 0, -13,
    -9, -2, -13,
    -9, -2, 8,
    -9, 0, 8,
], 1, 10.5));
scene.add(createTileRectangleFromPoints([
    -2, 0, 8,
    -2, -2, 8,
    -2, -2, -13,
    -2, 0, -13,
], 1, 10.5));
scene.add(createTileRectangleFromPoints([
    -9, 0, -13,
    -2, 0, -13,
    -2, -2, -13,
    -9, -2, -13,
], 3.5, 1));
scene.add(createTileRectangleFromPoints([
    -2, 0, 8,
    -9, 0, 8,
    -9, -2, 8,
    -2, -2, 8,
], 3.5, 1));
scene.add(createTileRectangleFromPoints([
    -9, -2, -13,
    -2, -2, -13,
    -2, -2, 8,
    -9, -2, 8,
], 3.5, 10.5));

//Water
scene.add(createWaterRectangleFromPoints([
    -9, -0.25, -13,
    -2, -0.25, -13,
    -2, -0.25, 8,
    -9, -0.25, 8,
], 3.5, 10.5));

//Walls
scene.add(createWallRectangle2FromPoints([
    -6, 5, -16,
    4, 5, -16,
    4, 0, -16,
    -6, 0, -16,
]));
scene.add(createWallRectangle5FromPoints([
    -6, 5, -16,
    4, 5, -16,
    4, 0, -16,
    -6, 0, -16,
]));
scene.add(createWallRectangleFromPoints([
    4, 5, -16,
    4, 5, 8,
    4, 0, 8,
    4, 0, -16,
]));
scene.add(createWallRectangleFromPoints([
    4, 5, 8,
    9, 5, 8,
    9, 0, 8,
    4, 0, 8,
]));
scene.add(createWallRectangle6FromPoints([
    4, 5, -16,
    -6, 5, -16,
    -6, 5, 11,
    4, 5, 11,
]));
scene.add(createWallRectangleFromPoints([
    9, 5, 11,
    -6, 5, 11,
    -6, 0, 11,
    9, 0, 11,
]));

//Room 1
scene.add(createWallRectangle3FromPoints([
    -6, 5, -24,
    4, 5, -24,
    4, 0, -24,
    -6, 0, -24,
]));
scene.add(createWallRectangle3FromPoints([
    -6, 5, -16,
    -6, 5, -24,
    -6, 0, -24,
    -6, 0, -16,
]));
scene.add(createWallRectangle3FromPoints([
    4, 5, -24,
    4, 5, -16,
    4, 0, -16,
    4, 0, -24,
]));
scene.add(createWallRectangle4FromPoints([
    -6, 5, -24,
    -6, 5, -16,
    4, 5, -16,
    4, 5, -24,
]));
scene.add(createWallRectangle4FromPoints([
    -6, 2, -24,
    -6, 2, -16,
    4, 2, -16,
    4, 2, -24,
]));

//Glass
scene.add(createGlassRectangleFromPoints([
    -12, 2, 11,
    -12, 2, -16,
    -12, 0, -16,
    -12, 0, 11,
], 9, 1));
scene.add(createGlassRectangleFromPoints([
    -12, 2, -16,
    -6, 2, -16,
    -6, 0, -16,
    -12, 0, -16,
], 3, 1));
scene.add(createGlassRectangleFromPoints([
    -6, 2, 11,
    -12, 2, 11,
    -12, 0, 11,
    -6, 0, 11,
], 3, 1));
scene.add(createGlassRectangleFromPoints([
    -6, 5, 11,
    -6, 5, -16,
    -12, 2, -16,
    -12, 2, 11,
], 9, 3));
scene.add(createGlassTriangleFromPoints([
    -12, 2, -16,
    -6, 2, -16,
    -6, 5, -16,
], 3, 0.9));
scene.add(createGlassTriangleFromPoints([
    -12, 2, 11,
    -6, 5, 11,
    -6, 2, 11,
], 3, 0.9));

//Pillars
scene.add(createBox(-6, 0, -16, 0.5, 5, 0.5));
scene.add(createBox(-6, 0, 10.5, 0.5, 5, 0.5));
scene.add(createBox(-6, 4.75, -16, 0.5, 0.25, 27));
scene.add(createBox(-6, 4.75, -7.25, 10, 0.25, 0.5));
scene.add(createBox(-6, 4.75, 1.75, 10, 0.25, 0.5));
scene.add(createBox(-6, 4.75, -16.25, 10, 0.25, 0.5));
scene.add(createBox(-6, 4.75, 10.75, 10, 0.25, 0.5));
scene.add(createBox(3.75, 4.75, -16, 0.5, 0.25, 27));
scene.add(createBox(3.75, 0, -16.25, 0.5, 5, 0.5));
scene.add(createBox(-1.125, 4.75, -16, 0.5, 0.25, 27));

function animate() {
    movement();

    renderer.render(scene, camera);
    Input.update();
}

renderer.setAnimationLoop(animate);

function movement() {
    const speed = Input.isKeyDown("ShiftLeft") ? 0.04 : 0.01;

    if (Input.isKeyDown("KeyW"))
        playerMesh.translateZ(-speed);
    if (Input.isKeyDown("KeyS"))
        playerMesh.translateZ(speed);
    if (Input.isKeyDown("KeyA"))
        playerMesh.translateX(-speed);
    if (Input.isKeyDown("KeyD"))
        playerMesh.translateX(speed);
    if (Input.isKeyDown("Space"))
        playerMesh.translateY(speed);
    if (Input.isKeyDown("ControlLeft"))
        playerMesh.translateY(-speed);

    if (!Input.isMouseLocked())
        return;

    const mouseMovement = Input.getMouseMovement();

    playerMesh.rotateY(-mouseMovement.x / 100);
    camera.rotateX(-mouseMovement.y / 100);
}

function createScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(backgroundColor, 0, 30);
    scene.background = createSkybox();

    return scene;
}

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);

    return renderer;
}
