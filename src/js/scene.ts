import * as THREE from "three";

export let aspect = window.innerWidth / window.innerHeight;
export const cameraDistance = 8;

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

export const camera = new THREE.OrthographicCamera(
  -cameraDistance * aspect,
  cameraDistance * aspect,
  cameraDistance,
  -cameraDistance,
  0.01,
  1000
);
camera.position.set(-0, -10, 5);
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

export function onWindowResize() {
  aspect = window.innerWidth / window.innerHeight;
  camera.left = -cameraDistance * aspect;
  camera.right = cameraDistance * aspect;
  camera.top = cameraDistance;
  camera.bottom = -cameraDistance;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
