import React, { useContext } from "react";

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}