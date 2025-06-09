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
  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = vec4(color);
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

  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    float min_distance = 3.;
    if (dist < min_distance) {
      float alpha = map(dist, min_distance, 0., color.a, 0.);
      color.a = alpha;
    }
    gl_FragColor = vec4(color);
  }
`;
