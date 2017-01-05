import * as axios from 'axios';
import * as qs from 'qs';

const tokenKey = 'token';

interface IAuthenticationResponse {
        access_token: string;
        expires_in: number;
}

export function isAuthenticated(): boolean {
    const token = localStorage.getItem(tokenKey);
    if (token) {
        return true;
    }
    return false;
}

export function login(email: string, password: string) {       
    return axios.post('http://localhost:5000/token',
        qs.stringify({Email: email, Password: password}))
        .then(response => {
            const authentication = response.data as IAuthenticationResponse;
            const token = authentication.access_token;
            localStorage.setItem(tokenKey, token);
            console.log('got token: ' + token);
            // set timer to remove token after expiresIn seconds
        });
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function register(email: string, password: string) {

}