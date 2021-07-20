import React, { createContext, useContext, useReducer, useMemo } from "react";
import { node } from 'prop-types';
import reducers from '../reducers';

const BoardContext = createContext();

export const BoardContextProvider = ({ children }) => {
    const [state, boardDispatch] = useReducer(reducers, {
        boardArr: null,
        result: 'Game is on progress!',
        displayAll: false, 
        gameIsOver: false
    });

    const contextBoardVal = useMemo(() => ({ ...state, boardDispatch }), [
        state,
    ]);

    return (
        <BoardContext.Provider value={contextBoardVal}>
            {children}
        </BoardContext.Provider>
    );
};

BoardContextProvider.propTypes = {
    children: node,
};

export const useBoardContext = () => useContext(BoardContext);
