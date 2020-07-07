import api from './';
import { Moment } from 'moment';

export interface AuthenticationForm {
    username: string,
    password: string
}

interface AuthenticationResponse {
    token: {
        token: string,
        tokenType: string
      },
      id: number,
      name: string,
      email: string,
      nascimento: Moment
}

export const authenticate = async (authForm: AuthenticationForm) => {
    const { data } = await api.post<AuthenticationResponse>("/login", authForm);
    return data;
}
