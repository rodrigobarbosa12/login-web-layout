import { AxiosPromise } from 'axios';
import xhr from './xrh';

interface Login {
    email: string,
    senha: string
}

const login = (params: Login): AxiosPromise<{ token: string }> => xhr.post('/login', params);

const api = {
    login
}

export default api;
