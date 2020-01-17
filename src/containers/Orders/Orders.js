import React, { useEffect, useState } from 'react';

import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = (props) => {
    const [ordersState, setOrdersState] = useState([]);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        Axios.get('/orders.json')
            .then(res => {
                setLoadingState(false);
                setOrdersState(
                    Object.keys(res.data).map(key => {
                        return {
                            ...res.data[key],
                            id: key
                        };
                    })
                );
            })
            .catch(err => {
                setLoadingState(false);
            });
    }, []);

    return (
        <div>
            <Order />
            <Order />
        </div>
    );
};

export default withErrorHandler(Orders, Axios);
