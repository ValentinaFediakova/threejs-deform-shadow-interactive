import { scene, renderer } from "./js/scene";
import { sphere, hitPlane, plane, planeShadow } from "./js/objects";
import { setupEventListeners } from "./js/events";
import { animate } from "./js/animate";
import * as THREE from "three";

import "./style.scss";

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

export const BASE_DIST = 3.0;

const btnPlus = document.getElementById("sphere-plus") as HTMLButtonElement;
const btnMinus = document.getElementById("sphere-minus") as HTMLButtonElement;

btnPlus.addEventListener("click", () => {
  sphere.scale.multiplyScalar(1.2);

  const scale = sphere.scale.x;
  plane.material.uniforms.uScale.value = scale;
  plane.material.uniforms.uMinDistance.value = BASE_DIST * scale;
});

btnMinus.addEventListener("click", () => {
  sphere.scale.multiplyScalar(0.8);

  const scale = sphere.scale.x;
  plane.material.uniforms.uScale.value = scale;
  plane.material.uniforms.uMinDistance.value = BASE_DIST * scale;
});

const colorInput = document.getElementById("text-color") as HTMLInputElement;

colorInput.addEventListener("input", () => {
  const col = new THREE.Color(colorInput.value);
  (plane.material as THREE.ShaderMaterial).uniforms.uTextColor.value.copy(col);
});
