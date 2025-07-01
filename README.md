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

## 🎛 Configuration & Customization

- **Textures**: swap `public/textures/texture-white.png` with your own alpha-mask PNG.
- **Shaders**: tweak `uniform` defaults in `objects.ts` or modify GLSL in `src/js/shaders.ts`.
- **UI Styles**: edit SCSS in `src/style.scss` to restyle control panel or canvas layout.
- **Build Settings**: adjust `webpack.config.js` for different loaders or output paths.

## 📝 Usage

1. Hover over the text to see the deformation effect.
2. Use **Increase / Decrease** buttons to change the deformation radius.
3. Pick a color with the **Color** input to recolor the text.
