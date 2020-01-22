/* eslint-disable indent */
import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
    let formElement = null;

    switch (props.elementType) {
        case 'textarea':
            formElement = <textarea
                className={styles.formElement}
                value={props.value}
                {...props.elementConfig} />;
            break;
        case 'input':
        default:
            formElement = <input
                className={styles.formElement}
                value={props.value}
                {...props.elementConfig} />;
    }

    return (
        <div className={styles.input}>
            <label className={styles.label}>{props.elementConfig.label}</label>
            {formElement}
        </div>
    );
};

export default Input;
