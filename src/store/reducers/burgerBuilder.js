import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_FAILED } from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isError: false
};

const PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.name]: state.ingredients[action.name] + 1
        },
        totalPrice: state.totalPrice + PRICES[action.name]
    };
};
const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.name]: state.ingredients[action.name] - 1
        },
        totalPrice: state.totalPrice - PRICES[action.name]
    };
};
const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: initialState.totalPrice,
        isError: false
    };
};
const fetchFailed = state => {
    return {
        ...state,
        isError: true
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(state, action);
        case REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_FAILED:
            return fetchFailed(state);
        default:
            return state;
    }
};

export default reducer;
