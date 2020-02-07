import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/actionTypes';

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + PRICES[action.name]
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - PRICES[action.name]
            };
        default:
            return state;
    }
};

export default reducer;
