import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    useEffect(() => {
        props.onFetchOrders();
    }, []);
    return (
        <div>
            {props.loading ? <Spinner /> : props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));
