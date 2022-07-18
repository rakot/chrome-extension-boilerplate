import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ExtensionContext} from "./index";

const ExtensionState = (props:any) => {
    const [loading, setLoading] = useState(false);
    const [initNavigationFinished, setInitNavigationFinished] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        if(initNavigationFinished) return;


    }, [initNavigationFinished]);

    return (
        <ExtensionContext.Provider value={{
            loading,
            // @ts-ignore
            setLoading,
            setInitNavigationFinished,
        }}>
            {props.children}
        </ExtensionContext.Provider>
    );
};

export default ExtensionState;