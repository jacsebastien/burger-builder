import React from 'react';

import styles from './BuildControls.module.css';

const BuildControl = (props) => (
    <div className={styles.buildControl}>
        <h3 className={styles.label}>{props.label}</h3>
        <button className={styles.less}>Less</button>
        <button className={styles.more} onClick={props.added}>More</button>
    </div>
);

export default BuildControl;
