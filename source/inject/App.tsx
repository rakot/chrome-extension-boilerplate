import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TailwindCss from './components/TailwindCss';
import AppRouter from './AppRouter';

function App () {
    const queryClient = new QueryClient();
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <TailwindCss></TailwindCss>
                        <div className={'fixed right-4 top-4 z-50'}>
                            <AppRouter />
                        </div>
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
