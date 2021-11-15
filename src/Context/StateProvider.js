//Setup Datalayer
import React, { createContext, useReducer, useContext } from "react";

//data layer
export const StateContext = createContext ();

//create a provider
export const StateProvider = ({reducer,initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//use the state inside of a component
export const useStateValue = () => useContext(StateContext)