import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // Convert object keys into an array and create number of element equals to each key value
    let ingredientsArray = props.ingredients ? Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key} />;
            });
        })
        .reduce((array, element) => array.concat(element), []) : [];

    if(!ingredientsArray.length) {
        ingredientsArray = <p>Please start adding ingredients.</p>;
    }

    return (
        <section className={styles.burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom" />
        </section>
    );
};

// Gain access to router properties
export default withRouter(Burger);
