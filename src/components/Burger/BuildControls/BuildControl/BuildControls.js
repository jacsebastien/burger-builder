import React from 'react';

import styles from './BuildControls.module.css';

const BuildControl = (props) => {
    <section className={styles.buildControl}>
        <h3 className={styles.label}>{props.label}</h3>
        <button className={styles.less}>Less</button>
        <button className={styles.more}>More</button>
    </section>;
};

export default BuildControl;
