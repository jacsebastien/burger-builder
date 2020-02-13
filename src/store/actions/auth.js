import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
    return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return { type: actionTypes.AUTH_FAILED, error: error };
};

export const logout = () => {
    localStorage.clear();
    return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = { email, password, returnSecureToken: true };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        url += isSignup ? 'signUp' : 'signInWithPassword';

        Axios.post(
            `${url}?key=AIzaSyBFmcqepd9LaAPI5KRTdz0vk4c3c9aY_ao`,
            authData
        ).then(response => {
            const expirationTime = new Date().getTime() + response.data.expiresIn * 1000;

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', new Date(expirationTime));

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDate = token ? new Date(localStorage.getItem('expirationDate')) : null;

        if (!token || expirationDate < new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
        }
    };
};
