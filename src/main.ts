import "./style.css";
import * as THREE from "three";
import { GUI } from "dat.gui";

interface Params {
  planeWidth: number;
  planeHeight: number;
  segments: number;
  minDistance: number;
  displacementScale: number;
}

async function loadTextures(): Promise<{
  texture: THREE.Texture;
  shadowTexture: THREE.Texture;
}> {
  const textureURL = "/textures/texture.png";
  const shadowTextureURL = "/textures/shadow.png";
  const loader = new THREE.TextureLoader();

  const [texture, shadowTexture] = await Promise.all([
    loader.loadAsync(textureURL),
    loader.loadAsync(shadowTextureURL),
  ]);

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  shadowTexture.wrapS = shadowTexture.wrapT = THREE.RepeatWrapping;

  texture.repeat.set(2, 2);
  shadowTexture.repeat.set(2, 2);

  return { texture, shadowTexture };
}

const initApp = async () => {
  const { texture, shadowTexture } = await loadTextures();
  const params: Params = {
    planeWidth: 15,
    planeHeight: 15,
    segments: 50,
    minDistance: 3.0,
    displacementScale: 1.0,
  };

  const scene = new THREE.Scene();
  const aspect = window.innerWidth / window.innerHeight;
  const size = 10;
  const camera = new THREE.OrthographicCamera(
    -size * aspect,
    size * aspect,
    size,
    -size,
    0.1,
    100
  );
  camera.position.set(0, -10, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container")!.appendChild(renderer.domElement);

  const uniforms = {
    uTexture: { value: texture },
    uDisplacement: { value: new THREE.Vector3(0, 0, 0) }, //sours of deformation
    uMinDistance: { value: params.minDistance },
    uScale: { value: params.displacementScale },
  };

  const shadowUniforms = {
    uTexture: { value: shadowTexture },
    uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
    uMinDistance: { value: params.minDistance },
    uScale: { value: 0 },
  };
};

initApp();
