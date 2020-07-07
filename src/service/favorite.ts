import api from "."

export interface Favorite {
    avatar_url: string,
    description: string,
    full_name: string,
    id?: number,
    login: string,
    name: string,
}

export const getFavoritesByUserId = async (userId: number) => {
    const { data } = await api.get<Favorite[]>(`/users/${userId}/favorites`);
    return data;
}

export const deleteFavorite = async (userId: number, favoriteId: number) => {
    const { data } = await api.delete(`/users/${userId}/favorites/${favoriteId}`);
    return data;
}
export const postFavorite = async (userId: number, favoriteForm: Favorite) => {
    const { data } = await api.post<Favorite>(`/users/${userId}/favorites`, favoriteForm);
    return data;
}