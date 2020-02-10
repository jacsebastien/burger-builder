import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [
                    ...state.orders,
                    {
                        ...action.orderData,
                        id: action.orderId
                    }
                ]
            };
        case actionTypes.PURCHASE_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
