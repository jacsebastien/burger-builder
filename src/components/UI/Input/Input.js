/* eslint-disable indent */
import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
    let formElement = null;

    switch (props.inputtype) {
        case 'textarea':
            formElement = <textarea className={styles.formElement} {...props} />;
            break;
        case 'input':
        default:
            formElement = <input className={styles.formElement} {...props} />;
    }

    return (
        <div className={styles.input}>
            <label className={styles.label}>{props.label}</label>
            {formElement}
        </div>
    );
};

export default Input;
