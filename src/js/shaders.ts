export const vertexShaderPlane = `
  varying vec2 vUv;
  uniform vec3 uDisplacement;
  
  float easeInOutCubic(float x) {
    return x < 0.5
      ? 4. * x * x * x
      : 1. - pow(-2. * x + 2., 3.) / 2.;
  }

  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }  

  void main() {
    vUv = uv;
    vec3 new_position = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.);
    float dist = length(uDisplacement - worldPosition.rgb);
    float min_distance = 3.;
    if (dist < min_distance) {
      float t = map(dist, 0., min_distance, 1., 0.);
      new_position.z += easeInOutCubic(t) * 1.;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
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
