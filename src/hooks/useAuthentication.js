import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../database/config";
import { useState } from "react";

export function useAuthentication() {
    const [user, setUser] = useState();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribe; 
    }, []);

    const signout = async () => {
        try {
            await signOut(auth);
            setUser(undefined);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return {
        user,
        signout,
    };
}
