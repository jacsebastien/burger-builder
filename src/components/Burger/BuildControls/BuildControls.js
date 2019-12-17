import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControls';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => (
    <section className={styles.buildControls}>
        <p>Current Price: <span className={styles.price}>{props.price.toFixed(2)}</span></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={!props.ingredients[ctrl.type]}/>
        ))}
        <button className={styles.orderButton}>ORDER NOW</button>
    </section>
);

export default BuildControls;
