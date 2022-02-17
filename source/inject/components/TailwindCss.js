import React from 'react';

const TailwindCss = () => {
    const cssFile = chrome.runtime.getURL('inject/inject.bundle.css');

    return (
        <link type="text/css" rel="stylesheet" href={cssFile}/>
    );
};

export default TailwindCss;