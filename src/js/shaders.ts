export const vertexShaderPlane = `
  varying vec2 vUv;
  uniform vec3  uDisplacement;
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
    float minDist = uMinDistance;

    if (dist < minDist) {
      float t = map(dist, 0.0, minDist, 1.0, 0.0);
      pos.z += easeInOutCubic(t) * uScale;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShaderPlane = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3       uTextColor;

  void main() {
    float a = texture2D(uTexture, vUv).a;
    if (a < 0.1) discard;
    gl_FragColor = vec4(uTextColor, 1.0);
  }
`;

export const vertexShaderShadow = `
  varying vec2 vUv;
  varying float dist;
  uniform vec3 uDisplacement;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.);
    dist = length(uDisplacement - worldPosition.rgb);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShaderShadow = `
  varying vec2 vUv;
  varying float dist;
  uniform sampler2D uTexture;
  uniform vec3     uShadowColor;

  float map(float v, float a1, float a2, float b1, float b2) {
    return b1 + (v - a1) * (b2 - b1) / (a2 - a1);
  }

  void main() {
    float a = texture2D(uTexture, vUv).a;
    float minDist = 3.0;

    if (dist < minDist) {
      a = map(dist, minDist, 0.0, a, 0.0);
    }

    gl_FragColor = vec4(uShadowColor, a);
  }
`;
