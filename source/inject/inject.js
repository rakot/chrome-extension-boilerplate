import './inject.css';
import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";

let appElement = document.createElement("div");
document.body.appendChild(appElement);
appElement.attachShadow({ mode: 'open' });


ReactDom.render(<App />, appElement.shadowRoot);