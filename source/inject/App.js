import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import ExtensionState from "./context/ExtensionState";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import TailwindCss from "./components/TailwindCss";

function App() {
    return (
        <>
            <TailwindCss></TailwindCss>
            <div className="fixed right-4 top-4 z-50">
                <Router>
                    <ExtensionState>
                        <Routes>
                            <Route path="/"  element={<IndexPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="*" element={<LoginPage />} />
                        </Routes>
                        <Loading />
                    </ExtensionState>
                </Router>
            </div>
        </>
    );
}

export default App;