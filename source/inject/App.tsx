import React from 'react';

import ExtensionState from "./context/ExtensionState";
import TailwindCss from "./components/TailwindCss";
import AppRouter from "./AppRouter";

function App() {
    return (
        <>
            <TailwindCss></TailwindCss>
            <div className={"fixed right-4 top-4 z-50"}>
                <AppRouter />
            </div>
        </>
    );
}

export default App;