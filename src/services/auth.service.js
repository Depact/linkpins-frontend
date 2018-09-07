import config from 'config';
import { authHeader } from '../helpers';

import axios from 'axios';
import { parseJSON } from '../utils/misc';

import jwtDecode from 'jwt-decode';

export const userService = {
    login,
    register,
    logout,
    data_about_user,
};

function login(email, password) {
    return axios.post('https://localhost:5001/account/token', {
        Email: email,
        Password: password,
    })
        .then(parseJSON)
        .then(response => {
            // debugger
            if (response.token) {
                let tpm = jwtDecode(response.token);
                let user = {
                    username: tpm.unique_name,
                    email: tpm.email,
                    token: response.token
                }
                localStorage.setItem('user', JSON.stringify(user));
                // debugger
                // axios.defaults.headers.common['Authorization'] =
                //     'Bearer ' + response.token;
                return user;
            }
            return error;
        },
            error => {
                let err = {};
                // response: {
                //     status: 503,
                //     statusText: 'User with that email already exists',
                // },
                // let errorMessage = "";
                if (error.response) {
                    err.response = error.response;
                    if (error.response.status === 400) {
                        logout();
                        err.status = error.response.status;
                        err.errorMessage = error.response.statusText;
                        err.info = error.response.data.message;
                    }

                    if (error.response.data.message) {
                        err.errorMessage = error.response.data.message;
                    }
                }

                if (error.message === "Network Error") {
                    err.status = 503;
                    err.errorMessage = "Network Error";
                }


                // debugger
                return Promise.reject(err);
            }



        );
}

function register(email, username, password) {
    return axios.post('https://localhost:5001/account/register', {
        Username: username,
        Email: email,
        Password: password
    })
        .then(parseJSON)
        .then(response => {
            // debugger
            if (response.token) {
                let tpm = jwtDecode(response.token);
                let user = {
                    username: tpm.unique_name,
                    email: tpm.email,
                    token: response.token
                }
                localStorage.setItem('user', JSON.stringify(user));
                // debugger
                // axios.defaults.headers.common['Authorization'] =
                //     'Bearer ' + response.token;
                return user;
            }
            return error;
        },
            error => {
                let err = {};
                // response: {
                //     status: 503,
                //     statusText: 'User with that email already exists',
                // },
                // let errorMessage = "";
                if (error.response) {
                    err.response = error.response;
                    if (error.response.status === 400) {
                        logout();
                        err.status = error.response.status;
                        err.errorMessage = error.response.statusText;
                        err.info = error.response.data.message;
                    }

                    if (error.response.data.message) {
                        err.errorMessage = error.response.data.message;
                    }
                }

                if (error.message === "Network Error") {
                    err.status = 503;
                    err.errorMessage = "Network Error";
                }


                // debugger
                return Promise.reject(err);
            }
        );
}

function logout() {
    localStorage.removeItem('user');
}

function data_about_user() {

    return axios.get('https://localhost:5001/account/user', {
        // let tmp = axios.get('http://httpbin.org/get', {
        headers: {
            Authorization: authHeader()
        }
    })
        .then(parseJSON)
        .then(user => {
            // console.log(user)
            return user;

        },
            error => {
                let errorMessage = "";
                if (error.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                    errorMessage = error.response.statusText;
                }

                if (error.message === "Network Error") {
                    // auto logout if 401 response returned from api
                    errorMessage = "Network Error";
                }

                return Promise.reject(errorMessage);
            }
        );
}