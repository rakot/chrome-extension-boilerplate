import React from 'react';
import {Outlet} from "react-router-dom";

const ExtensionPage = () => {
    return (
        <div className={"bg-white border border-amber-900 rounded-xl p-4 text-gray-800"}>
            <h4 className={"mb-4"}>Extension boilerplate</h4>

            <Outlet />
        </div>
    );
};

export default ExtensionPage;