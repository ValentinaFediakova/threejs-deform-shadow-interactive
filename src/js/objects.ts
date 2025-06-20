import * as THREE from "three";
import {
  vertexShaderPlane,
  fragmentShaderPlane,
  vertexShaderShadow,
  fragmentShaderShadow,
} from "./shaders";

const TEXTURE_PATH = "./textures/texture-white.png";

export const sphere = (() => {
  const geometry = new THREE.SphereGeometry(0.25, 32, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 2;
  return mesh;
})();

export const hitPlane = (() => {
  const geometry = new THREE.PlaneGeometry(500, 500, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "hit";
  return mesh;
})();

export const planeShadow = (() => {
  const geo = new THREE.PlaneGeometry(15, 15, 100, 100);
  const tex = new THREE.TextureLoader().load(TEXTURE_PATH);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: tex },
      uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
      uShadowColor: { value: new THREE.Color(0.5, 0.5, 0.5) },
      uMinDistance: { value: 3.0 },
    },
    vertexShader: vertexShaderShadow,
    fragmentShader: fragmentShaderShadow,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  mat.depthTest = false;
  mat.depthWrite = false;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.z = Math.PI / 4;

  mesh.renderOrder = 0;
  return mesh;
})();

export const plane = (() => {
  const geo = new THREE.PlaneGeometry(15, 15, 100, 100);
  const tex = new THREE.TextureLoader().load(TEXTURE_PATH);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: tex },
      uDisplacement: { value: new THREE.Vector3(1000, 1000, 1000) },
      uTextColor: { value: new THREE.Color(0x000000) },
      uMinDistance: { value: 3.0 },
      uScale: { value: 1.0 },
    },
    vertexShader: vertexShaderPlane,
    fragmentShader: fragmentShaderPlane,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  mat.depthTest = false;
  mat.depthWrite = false;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.z = Math.PI / 4;

  mesh.renderOrder = 1;
  return mesh;
})();
