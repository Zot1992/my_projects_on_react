import { createContext, useState, useEffect } from "react";
import { arrUsers } from "../db";

export const ItemsContext = createContext();

export function ItemsProvider({ children }) {
    const [users, setUsers] = useState(arrUsers);

    return (
        <ItemsContext.Provider value={{ users, setUsers }}>
            {children}
        </ItemsContext.Provider>
    )
}