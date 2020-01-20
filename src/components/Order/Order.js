import React from 'react';

import styles from './Order.module.css';

const Order = (props) => {
    const ingredients = props.ingredients ? Object.keys(props.ingredients)
        .map(key => {
            // return {name: key, amount: props.ingredients[key]};
            return <span className={styles.ingredient} key={key}>{key} ({props.ingredients[key]})</span>;
        }) : null;

    return (
        <div className={styles.order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} €</strong></p>
        </div>
    );
};

export default Order;
