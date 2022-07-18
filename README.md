# Chrome extension boilerplate with TypeScript, React, Redux, Tailwind, Webpack and V3 Manifest

- React for both inject and popup scripts
- Redux storage with PersistGate to extension storage
- Tailwind in inject script is sandboxed by ShadowDom and will not affect/be affected by injected page.


## Usage

`npm run watch` - development build with extension hot reaload

`npm run build` - production build

Extension will be placed into two different folders:
- "chrome" - for chrome with manifest v3
- "firefox" - for firefox with manifest v2

### Still raw and have a lot of bugs
