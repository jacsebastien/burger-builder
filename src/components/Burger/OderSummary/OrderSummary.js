import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
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
            <p><span style={{fontWeight: '500'}}>Total Price:</span> {props.price.toFixed(2)}€</p>
            <p>Continue to Checkout ?</p>
            <Button btnType="danger"
                clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="success"
                clicked={props.purchaseContinue}>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;
