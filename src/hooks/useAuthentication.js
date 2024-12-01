import React from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../database/config';
import { useState } from "react";

export function useAuthentication(){
    const [user, setUser] = useState();

    React.useEffect(() => {
        const checkUser = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            }else {
                setUser(undefined)
            }
        });

        return checkUser
    }, []);

    return {
        user
    };
}