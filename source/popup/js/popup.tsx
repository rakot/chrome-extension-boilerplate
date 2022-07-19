import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const domContainer = document.querySelector('#app');
console.log(domContainer);
if (domContainer !== null) {
    const root = createRoot(domContainer);
    root.render(<App />);
}
