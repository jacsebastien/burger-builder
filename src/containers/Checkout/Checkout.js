import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [ingredientsState, setIngredientsState] = useState({
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
    });

    // With empty array as a second argument, equivalent of componentDidMount in class based components
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};

        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }

        setIngredientsState(ingredients);
    }, []);

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredientsState}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            {/* Load ContactData component under summary only when we go to contact-data route */}
            <Route path={`${props.match.path}/contact-data`} component={ContactData}/>
        </div>
    );
};

export default Checkout;
