import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [ingredientsState, setIngredientsState] = useState({});
    const [priceState, setPriceState] = useState(0);

    // With empty array as a second argument, equivalent of componentDidMount in class based components
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        setIngredientsState(ingredients);
        setPriceState(price);
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
            {/* <Route path={`${props.match.path}/contact-data`} component={ContactData}/> */}
            <Route
                path={`${props.match.path}/contact-data`}
                render={() => (<ContactData ingredients={ingredientsState} totalPrice={priceState} />)}
            />
        </div>
    );
};

export default Checkout;
