import React, { Fragment, Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[OrderSummary] componentDidUpdate');
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {this.props.ingredients[ingKey]}
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
                <p><span style={{ fontWeight: '500' }}>Total Price:</span> {this.props.price.toFixed(2)}€</p>
                <p>Continue to Checkout ?</p>
                <Button btnType="danger"
                    clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="success"
                    clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Fragment>
        );
    }
}

export default OrderSummary;
