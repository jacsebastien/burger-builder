import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const addIngredient = (name) => {
    return { type: actionTypes.ADD_INGREDIENT, name: name };
};

export const removeIngredient = (name) => {
    return { type: actionTypes.REMOVE_INGREDIENT, name: name };
};

export const setIngredients = ingredients => {
    return { type: actionTypes.SET_INGREDIENTS, ingredients: ingredients };
};

export const fetchFailed = () => {
    return { type: actionTypes.FETCH_FAILED };
};

export const initIngredients = () => {
    return dispatch => {
        Axios.get('https://react-my-burger-64994.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchFailed());
            });
    };
};
