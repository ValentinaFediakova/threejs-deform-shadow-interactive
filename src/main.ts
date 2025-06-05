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

  const imagesContainer = document.createElement("div");
  imagesContainer.style.display = "flex";
  imagesContainer.style.gap = "16px";
  imagesContainer.style.padding = "16px";

  const imgTexture = document.createElement("img");
  imgTexture.src = (texture.image as HTMLImageElement).src;
  imgTexture.alt = "Texture";
  imgTexture.style.maxWidth = "200px";
  imagesContainer.appendChild(imgTexture);

  const imgShadow = document.createElement("img");
  imgShadow.src = (shadowTexture.image as HTMLImageElement).src;
  imgShadow.alt = "Shadow Texture";
  imgShadow.style.maxWidth = "200px";
  imagesContainer.appendChild(imgShadow);

  document.body.appendChild(imagesContainer);
};

initApp();
