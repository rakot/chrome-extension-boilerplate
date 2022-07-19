import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const appElement = document.createElement('div');
document.body.appendChild(appElement);
appElement.attachShadow({ mode: 'open' });

// @ts-ignore
const root = createRoot(appElement.shadowRoot);
root.render(<App />);
