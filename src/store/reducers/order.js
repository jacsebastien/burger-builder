import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = state => {
    return {
        ...state,
        purchased: false
    };
};
const purchaseStart = state => {
    return {
        ...state,
        loading: true
    };
};
const purchaseSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: [
            ...state.orders,
            {
                ...action.orderData,
                id: action.orderId
            }
        ]
    };
};
const purchaseFailed = state => {
    return {
        ...state,
        loading: false
    };
};
const fetchOrdersStart = state => {
    return {
        ...state,
        loading: true
    };
};
const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
};
const fetchOrdersFailed = state => {
    return {
        ...state,
        loading: false
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state);
        case actionTypes.PURCHASE_START:
            return purchaseStart(state);
        case actionTypes.PURCHASE_SUCCESS:
            return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_FAILED:
            return purchaseFailed(state);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state);
        default:
            return state;
    }
};

export default reducer;
