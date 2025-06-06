export const vertexShaderDeform = `
  varying vec2 vUv;
  uniform vec3 uDisplacement;
  uniform float uMinDistance;
  uniform float uScale;

  float easeInOutCubic(float x) {
    return x < 0.5 
      ? 4.0 * x * x * x 
      : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
  }

  float map(float v, float a1, float a2, float b1, float b2) {
    return b1 + (v - a1) * (b2 - b1) / (a2 - a1);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    float dist = length(uDisplacement - worldPos.xyz);

    if (dist < uMinDistance) {
      float t = map(dist, 0.0, uMinDistance, 1.0, 0.0);
      pos.z += easeInOutCubic(t) * uScale;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShaderDeform = `
  varying vec2 vUv;
  uniform vec3 uColor;

  void main() {
    gl_FragColor = vec4(uColor, 1.0);
  }
`;

export const vertexShaderShadow = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShaderShadow = `
  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = vec4(vec3(tex.r), tex.a);
  }
`;
