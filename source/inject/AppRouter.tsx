import React from 'react';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Loading from './components/Loading';
import ExtensionState from './context/ExtensionState';
import ExtensionPage from './pages/ExtensionPage';

const AppRouter = () => {
    return (
        <MemoryRouter>
            <ExtensionState>
                <Routes>
                    <Route path={'/extension'} element={<ExtensionPage />}>
                        <Route path={'/extension/index'} element={<IndexPage />} />
                        <Route path={'/extension/login'} element={<LoginPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to={'/extension/index'} replace={true} />} />
                </Routes>
                <Loading />
            </ExtensionState>
        </MemoryRouter>
    );
};

export default AppRouter;
