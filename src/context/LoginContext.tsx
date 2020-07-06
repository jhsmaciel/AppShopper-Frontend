import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service';
import { nameStorage } from '../config'
import { authenticate, AuthenticationForm } from '../service/authentication';

interface User {
    id: number,
    name: string,
    email: string,
    nascimento: string
}

interface ContextLoginValues {
    signed: boolean, 
    user: User,
    loading: boolean,
    signIn: (authenticationForm: AuthenticationForm) => void,
    signOut: () => void
}

const AuthContext = createContext<ContextLoginValues>({} as ContextLoginValues)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            const storagedUser = await AsyncStorage.getItem(`${nameStorage}user`);
            const storagedToken = await AsyncStorage.getItem(`${nameStorage}token`);

            if (storagedToken && storagedUser) {
                api.defaults.headers["Authorization"] = storagedToken;

                setUser(JSON.parse(storagedUser));
                setLoading(false)
                setSigned(true)
            }
        }
        loadData();
    }, [])

    async function signIn({ username, password }: AuthenticationForm) {
        const userInfos = await authenticate({ username, password });

        const userFormed: User = { 
            id: userInfos.id, 
            name: userInfos.name,
            email: userInfos.email,
            nascimento: userInfos.nascimento 
        }

        console.log(userFormed)
        const tokenFormed = `${userInfos.token.tokenType} ${userInfos.token.token}`;

        api.defaults.headers["Authorization"] = tokenFormed;

        await AsyncStorage.setItem(`${nameStorage}user`, JSON.stringify(userFormed));
        await AsyncStorage.setItem(`${nameStorage}token`, tokenFormed);

        setUser(userFormed);
        setSigned(true)
        return userFormed;
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setSigned(false);
        });
    }

    return (
        <AuthContext.Provider value={{ signed, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthentication() {
    const context = useContext(AuthContext);
    return context;
}

export default AuthContext;
