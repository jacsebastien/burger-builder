import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

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

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const isError = useSelector(state => state.burgerBuilder.isError);
    const isAuth = useSelector(state => !!state.auth.token);

    const dispatch = useDispatch();
    const onAddIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onRemoveIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    // useCallback avoid re creating function on each component reloading / change
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirect = (path) => dispatch(actions.setAuthRedirect(path));

    // const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = () => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuth) {
            setPruchasing(true);
        } else {
            onSetAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    };

    const pruchaseCancelHandler = () => {
        setPruchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    let burger = isError ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
        orderSummary = <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={pruchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler} />;

        burger = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={onAddIngredient}
                    ingredientRemoved={onRemoveIngredient}
                    ingredients={ingredients}
                    purchasable={updatePurchaseState()}
                    ordered={purchaseHandler}
                    price={totalPrice}
                    isAuth={isAuth} />
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

// const mapStateToProps = state => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         totalPrice: state.burgerBuilder.totalPrice,
//         isError: state.burgerBuilder.isError,
//         isAuth: !!state.auth.token
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
//         onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
export default withErrorHandler(BurgerBuilder, Axios);

