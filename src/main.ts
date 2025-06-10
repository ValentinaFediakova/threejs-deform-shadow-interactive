import { scene } from "./js/scene";
import { sphere, hitPlane, plane, planeShadow } from "./js/objects";
import { setupEventListeners } from "./js/events";
import { animate } from "./js/animate";

scene.add(sphere);
scene.add(hitPlane);
scene.add(planeShadow);
scene.add(plane);

setupEventListeners();

animate();
