import React from 'react';

const TailwindCss = () => {
    const cssFile = chrome.runtime.getURL('assets/extension.bundle.css');

    return (
        <link type="text/css" rel="stylesheet" href={cssFile}/>
    );
};

export default TailwindCss;
