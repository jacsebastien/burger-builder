import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // Convert object keys into an array and create number of element equals to each key value
    const ingredientsArray = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key} />;
            });
        });
    return (
        <section className={styles.burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom" />
        </section>
    );
};

export default Burger;
