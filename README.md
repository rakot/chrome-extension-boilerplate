# Chrome extension boilerplate V3 Manifest with TypeScript, React, Redux, Tailwind, React Query and Webpack

- React for both inject and popup scripts
- Redux storage with PersistGate to extension storage
- Tailwind in inject script is sandboxed by ShadowDom and will not affect/be affected by injected page.
- React Query


## Usage

`npm run watch` - development build with extension hot reaload

`npm run build` - production build

Extension will be placed into two different folders:
- "chrome" - for chrome with manifest v3
- "firefox" - for firefox with manifest v2

### Still raw and have a lot of bugs
