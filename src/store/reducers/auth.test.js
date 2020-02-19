import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('Should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('Should store the token after login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'dummy-token',
            userId: 'dummy-user-id'
        })).toEqual({
            token: 'dummy-token',
            userId: 'dummy-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});
