import React from 'react';
import ReduxDemo from '../components/ReduxDemo';
import QueryDemo from '../components/QueryDemo';

const IndexPage = () => {

    return (
        <div className={'font-sans'}>
            <div>
                <ReduxDemo />
            </div>
            <div className={'mt-4'}>
                <QueryDemo />
            </div>
        </div>
    );
};

export default IndexPage;
