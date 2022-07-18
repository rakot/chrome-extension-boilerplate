import React, {useContext} from 'react';
import {ExtensionContext} from "../context";

const Loading = () => {

    const {
        loading
    } = useContext(ExtensionContext);

    return (
        <div className={(loading) ? 'loading-state active' : 'loading-state'}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;