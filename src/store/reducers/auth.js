import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state) => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
        userId: action.userId
    };
};

const authFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const authLogout = (state) => {
    return {
        ...state,
        token: null,
        userId: null
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
};

export default reducer;
