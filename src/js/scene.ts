import * as THREE from "three";

let aspect = window.innerWidth / window.innerHeight;
const camera_distance = 8;

export const scene = new THREE.Scene();

export const camera = new THREE.OrthographicCamera(
  -camera_distance * aspect,
  camera_distance * aspect,
  camera_distance,
  -camera_distance,
  0.01,
  1000
);
camera.position.set(0, -10, 5);
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));

document.body.appendChild(renderer.domElement);

export let currentAspect = aspect;
export const CAMERA_DISTANCE = camera_distance;

export function resizeRenderer() {
  currentAspect = window.innerWidth / window.innerHeight;
  camera.left = -CAMERA_DISTANCE * currentAspect;
  camera.right = CAMERA_DISTANCE * currentAspect;
  camera.top = CAMERA_DISTANCE;
  camera.bottom = -CAMERA_DISTANCE;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
