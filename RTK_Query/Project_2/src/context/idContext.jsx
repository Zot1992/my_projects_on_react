import { createContext, useState } from "react";

export const idContext = createContext();

export function IdProvider({ children }) {

    const [id, setId] = useState(null);

    return (
        <idContext.Provider value={{ id, setId }}>
            {children}
        </idContext.Provider>
    )
}