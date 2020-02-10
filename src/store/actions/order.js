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

export const purchase = orderData => {
    return dispatch => {
        dispatch(purchaseStart());
        Axios.post('orders.json', orderData)
            .then(response => {
                dispatch(purchaseSuccess(response.data, orderData));
            })
            .catch(error => {
                dispatch(purchaseFailed(error));
            });
    };
};
