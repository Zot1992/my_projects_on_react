import { createContext, useState } from "react";

export const ContextList = createContext();

export function ContextProvider({ children }) {
    const [list, setList] = useState([]);

    return (
        <ContextList.Provider value={{ list, setList }}>
            {children}
        </ContextList.Provider>
    )
}