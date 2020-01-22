/* eslint-disable indent */
import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
    let formElement = null;
    const inputStyles = [styles.formElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.invalid);
    }

    switch (props.elementType) {
        case 'textarea':
            formElement = <textarea
                className={inputStyles.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig} />;
            break;
        case 'select':
            formElement = (
                <select
                    className={inputStyles.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options
                        .map((option, i) => (
                            <option key={i} value={option.value}>{option.display}</option>
                        ))
                    }
                </select>
            );
            break;
        case 'input':
        default:
            formElement = <input
                className={inputStyles.join(' ')}
                value={props.value}
                onChange={props.changed}
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
