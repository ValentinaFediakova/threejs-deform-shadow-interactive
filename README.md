# threejs-deform-shadow-interactive

Interactive Three.js demo: deforming text with a shader effect and dynamic shadow, controlled by mouse position and handy UI controls.

## 📦 Project Structure

```
/public                # Static assets served
  └─ textures
       └─ texture-white.png  # PNG mask: white text on transparent background
/src
  ├─ js/
  │   ├─ scene.ts           # Scene, camera, renderer setup
  │   ├─ shaders.ts         # GLSL shaders for deformation & shadow
  │   ├─ objects.ts         # Mesh creations: plane, shadow, hit-plane, sphere
  │   ├─ events.ts          # Pointer & resize event handlers
  │   └─ animate.ts         # Animation loop
  ├─ main.ts                # Entry point: imports, DOM injection, UI bindings
  └─ style.scss             # Global SCSS styles for controls & layout

webpack.config.js          # Webpack build & dev server configuration
package.json               # npm scripts and dependencies
tsconfig.json              # TypeScript compiler options
index.html                 # HTML template (WebpackPlugin)
```

## 🚀 Features

- **Shader-based text deformation**: mouse proximity raises characters via a smooth cubic easing.
- **Dynamic shadow**: underlying text layer fades out under the cursor.
- **UI Controls**:

  - Increase / decrease "sphere" radius → adjusts deformation zone.
  - Color picker → recolor the text in real time.

- Modular **ES6 + TypeScript** code, built with Webpack.

## 🛠 Prerequisites

- Node.js v14+ / npm

## 🔧 Installation

```bash
# Clone repo
git clone https://github.com/ValentinaFediakova/threejs-deform-shadow-interactive.git
cd threejs-deform-shadow-interactive

# Install dependencies
npm install
```

## ⚙️ Development

```bash
# Start dev server with HMR
npm run start
```

This will open `http://localhost:3000` and watch for changes.

## 📦 Production Build

```bash
npm run build
```

Bundles optimized assets to `/public` for deployment.
