import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ExtensionContext} from "./index";
import IndexPage from "../pages/IndexPage";

const ExtensionState = (props) => {
    const [loading, setLoading] = useState(false);
    const [initNavigationFinished, setInitNavigationFinished] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        if(initNavigationFinished) return;


    }, [initNavigationFinished]);

    return (
        <ExtensionContext.Provider value={{
            loading,
            setLoading,
            setInitNavigationFinished,
        }}>
            {props.children}
        </ExtensionContext.Provider>
    );
};

export default ExtensionState;