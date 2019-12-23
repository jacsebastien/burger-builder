import React, { Fragment } from 'react';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{'text-transform': 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>
            );
        });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout ?</p>
        </Fragment>
    );
};

export default OrderSummary;
