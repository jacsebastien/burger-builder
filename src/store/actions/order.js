import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const purchaseSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: data
    };
};

export const purchaseFailed = error => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: error
    };
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchase = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        Axios.post(`orders.json?auth=${token}`, orderData)
            .then(response => {
                dispatch(purchaseSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseFailed(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStarted = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStarted());
        Axios.get(`/orders.json?auth=${token}`)
            .then(res => {
                const orders = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key],
                        id: key
                    };
                });
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    };
};
