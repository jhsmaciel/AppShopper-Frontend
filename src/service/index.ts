import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.3.108:8080'
});

export default api;


export const apiGit = axios.create({
    baseURL: 'https://api.github.com/'
})

