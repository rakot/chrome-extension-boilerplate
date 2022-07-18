import React, { useState } from 'react';
import { ExtensionContext } from './index';

const ExtensionState = (props:any) => {
    const [loading, setLoading] = useState(false);
    const [setInitNavigationFinished] = useState(false);

    return (
        <ExtensionContext.Provider value={{
            loading,
            // @ts-ignore
            setLoading,
            setInitNavigationFinished
        }}>
            {props.children}
        </ExtensionContext.Provider>
    );
};

export default ExtensionState;
