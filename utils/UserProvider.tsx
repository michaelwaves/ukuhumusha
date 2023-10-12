import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { useAuth } from "./Firebase";

type UserContextType = {
    user: User | null,
    signedIn: boolean
}

export const UserContext = createContext<UserContextType | {}>({});

export default function UserProvider({ children }: { children: any }) {
    const { signedIn, user } = useAuth();
    return (
        <UserContext.Provider value={{ signedIn, user }}>
            {children}
        </UserContext.Provider>
    )
}
