import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

const BurgerBuilder = (props) => {
    const [purchasing, setPruchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = () => {
        const sum = Object.keys(props.ingredients)
            .map(igKey => props.ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPruchasing(true);
        } else {
            props.onSetAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    };

    const pruchaseCancelHandler = () => {
        setPruchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    let burger = props.isError ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (props.ingredients) {
        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            price={props.totalPrice}
            purchaseCancelled={pruchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler} />;

        burger = (
            <Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemoved={props.onRemoveIngredient}
                    ingredients={props.ingredients}
                    purchasable={updatePurchaseState()}
                    ordered={purchaseHandler}
                    price={props.totalPrice}
                    isAuth={props.isAuth} />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={pruchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isError: state.burgerBuilder.isError,
        isAuth: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
