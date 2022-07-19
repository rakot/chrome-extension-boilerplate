import React from 'react';
import { Outlet } from 'react-router-dom';

const ExtensionPage = () => {
    return (
        <div className={'bg-gradient-to-r from-yellow-300 to-blue-600 border border-amber-900 rounded-xl p-4 text-gray-800'}>
            <h4 className={'mb-4'}>Extension boilerplate</h4>

            <Outlet />
        </div>
    );
};

export default ExtensionPage;
