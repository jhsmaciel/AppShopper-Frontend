import api from "."
import { User } from "../context/LoginContext";
import { Moment } from 'moment';

export interface UserForm {
    name: string,
    email: string,
    nascimento: Moment,
    senha: string
}

export const postUser = async (userForm: UserForm) => {
    try {
        const { data } = await api.post<User>("/users", userForm);
        return data;
    } catch (error) {
        throw new Error(`Não foi possível cadastrar o usuário!\n${error.message}`)
    }
}

export const putUser = async (userId: number, userForm: UserForm) => {
    try {
        const { data } = await api.put<User>(`/users/${userId}`, userForm);
        return data;
    } catch (error) {
        throw new Error(`Não foi possível alterar os dados do usuário!\n${error.message}`)
    }
}
