import React, { createContext, useState, useEffect } from 'react'
import getState from "./flux.jsx"

export const Context = createContext(null);

export const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState (
            getState ({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updateStore) =>
                    setState ({
                        store: Object.assign({}, state.store, updateStore),
                        actions: { ...state.actions },
                    }),
            })
        );

        useEffect(() => {
            state.actions.syncTokenFromLocalStore();
        }, []);

        return(
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
