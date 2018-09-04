import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import { parseJSON } from '../utils/misc';

export const userActions = {
    login,
    register,
    logout,
    data_about_user
};

function login(email, password) {
    return function (dispatch) {
        let user = {
            email: email,
            password: password
        }
        dispatch(loginUserRequest(user));
        return userService.login(email, password)
            .then(
                user => {
                    // debugger
                    dispatch(loginUserSuccess(user));
                    history.push('/');
                },
                error => {
                    // debugger
                    dispatch(loginUserFailure(error));
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };


}

export function loginUserRequest(user) {
    return {
        type: userConstants.LOGIN_USER_REQUEST,
        payload: {
            user,
        },
    };
}

export function loginUserSuccess(token) {
    // localStorage.setItem('token', token);
    return {
        type: userConstants.LOGIN_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function loginUserFailure(error) {
    // localStorage.removeItem('token');
    return {
        type: userConstants.LOGIN_USER_FAILURE, payload: error, error
        // payload: {
        //     status: error.response.status,
        //     statusText: error.response.statusText,
        // },
    };
}

function register(email, username, password) {
    return function (dispatch) {
        let user = {
            email: email,
            username: username,
            password: password
        }
        dispatch(registerUserRequest(user));
        return userService.register(email, username, password)
            .then(
                user => {
                    // debugger
                    dispatch(registerUserSuccess(user));
                    history.push('/');
                },
                error => {
                    dispatch(registerUserFailure(error));
                }
            );
    };
}

export function registerUserRequest(user) {
    return {
        type: userConstants.REGISTER_USER_REQUEST,
        payload: {
            user,
        },
    };
}

export function registerUserSuccess(token) {
    // localStorage.setItem('token', token);
    return {
        type: userConstants.REGISTER_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function registerUserFailure(error) {
    // localStorage.removeItem('token');
    return {
        type: userConstants.REGISTER_USER_FAILURE, payload: error, error
        // payload: {
        //     status: error.response.status,
        //     statusText: error.response.statusText,
        // },
    };
}

function logout() {
    return function (dispatch) {
        userService.logout();
        dispatch(logoutUserExecution())
        history.push('/');
    };

}

export function logoutUserExecution() {
    return {
        type: userConstants.LOGOUT_USER
    };
}

function data_about_user() {
    return dispatch => {
        dispatch(profileUserRequest());
        userService.data_about_user()
            .then(
                user => {
                    dispatch(profileUserSuccess(user))
                    // debugger
                },
                error => {
                    // debugger
                    dispatch(profileUserFailure(error))
                }
            );
    };

    function profileUserRequest() {
        return {
            type: userConstants.PROFILE_USER_REQUEST
        }
    }

    function profileUserSuccess(data) {
        return {
            type: userConstants.PROFILE_USER_SUCCESS,
            data
        }
    }

    function profileUserFailure(error) {
        return {
            type: userConstants.PROFILE_USER_FAILURE,
            error
        }
    }
}