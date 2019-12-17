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
        {controls.map(c => (
            <BuildControl key={c.label} label={c.label} />
        ))}
    </section>
);

export default BuildControls;
