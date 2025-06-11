import { scene, renderer } from "./js/scene";
import { sphere, hitPlane, plane, planeShadow } from "./js/objects";
import { setupEventListeners } from "./js/events";
import { animate } from "./js/animate";
import * as THREE from "three";

const canvas = renderer.domElement;
canvas.id = "threejs-canvas";

if (!document.getElementById(canvas.id)) {
  document.body.appendChild(canvas);
}

scene.add(sphere);
scene.add(hitPlane);
scene.add(planeShadow);
scene.add(plane);

setupEventListeners();

animate();

const spherePlusButton = document.getElementById("sphere-plus");
if (spherePlusButton) {
  spherePlusButton.addEventListener("click", () => {
    sphere.scale.multiplyScalar(1.2);
  });
}
const sphereMinusButton = document.getElementById("sphere-minus");
if (sphereMinusButton) {
  sphereMinusButton.addEventListener("click", () => {
    sphere.scale.multiplyScalar(0.8);
  });
}

const textColorInput = document.getElementById("text-color");
if (textColorInput) {
  textColorInput.addEventListener("input", (e) => {
    const hex = (e.target as HTMLInputElement).value;
    const color = new THREE.Color(hex);
    plane.material.uniforms.uTextColor.value.copy(color);
  });
}
