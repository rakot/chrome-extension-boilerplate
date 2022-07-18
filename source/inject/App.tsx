import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';

import TailwindCss from './components/TailwindCss';
import AppRouter from './AppRouter';

function App () {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <TailwindCss></TailwindCss>
                    <div className={'fixed right-4 top-4 z-50'}>
                        <AppRouter />
                    </div>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
