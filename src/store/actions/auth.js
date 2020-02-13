import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
    return { type: actionTypes.AUTH_START };
};

export const authSuccess = (authData) => {
    return { type: actionTypes.AUTH_SUCCESS, authData: authData };
};

export const authFailed = (error) => {
    return { type: actionTypes.AUTH_FAILED, error: error };
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
            console.log(response);
            dispatch(authSuccess(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(authFailed(error));
        });
    };
};
