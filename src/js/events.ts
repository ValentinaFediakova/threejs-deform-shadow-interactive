import * as THREE from "three";
import { camera, onWindowResize } from "./scene";
import { sphere, hitPlane, plane, planeShadow } from "./objects";

export const raycaster = new THREE.Raycaster();
export const pointer = new THREE.Vector2();

interface PointerEventWithClient extends PointerEvent {
  clientX: number;
  clientY: number;
}

export function onPointerMove(event: PointerEventWithClient): void {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects: THREE.Intersection[] = raycaster.intersectObject(hitPlane);

  if (intersects.length > 0) {
    const p: THREE.Vector3 = intersects[0].point;
    sphere.position.copy(p);

    plane.material.uniforms.uDisplacement.value = p;
    planeShadow.material.uniforms.uDisplacement.value = p;
  }
}

export function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("pointermove", onPointerMove);
}
