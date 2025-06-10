import { renderer, scene, camera } from "./scene";

export function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
