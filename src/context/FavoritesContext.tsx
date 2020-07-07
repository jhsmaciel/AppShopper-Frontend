import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { nameStorage } from '../config'
import { getFavoritesByUserId, Favorite } from '../service/favorite';
import { useAuthentication } from './LoginContext';

interface ContextFavoritesValues {
    favorites: Favorite[],
    setFavorites: (value: Favorite[]) => void,

}

const FavoritesContext = createContext<ContextFavoritesValues>({} as ContextFavoritesValues)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthentication();
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const favos = await getFavoritesByUserId(user.id);
                setFavorites(favos);
            } catch (error) {
                getStorageFavorites()
            }
        }
        
        loadData();
    }, [])

    useEffect(() => {
        async function storageFavorites() {
            try {
                if(favorites.length > 0)
                await AsyncStorage.setItem(`${nameStorage}favorites`, JSON.stringify(favorites));
            } catch (error) {
                // Do nothing
            }
        }
        storageFavorites();
    }, [favorites])

    async function getStorageFavorites() {
        const favos = JSON.parse(await AsyncStorage.getItem(`${nameStorage}favorites`)) as Favorite[];
        setFavorites(favos)
    }

    return (
        <FavoritesContext.Provider value={{ setFavorites, favorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    return context;
}

export default FavoritesContext;
