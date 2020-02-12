import React, { useState } from 'react';

import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


const Auth = props => {
    const [formState, setFormState] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...formState,
            [inputIdentifier]: {
                ...formState[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, formState[inputIdentifier].validation),
                touched: true
            }
        };

        setFormState(updatedForm);
    };

    // RENDER //
    const formElementsArray = Object.keys(formState)
        .map(key => {
            return {
                ...formState[key],
                id: key
            };
        });

    const inputs = formElementsArray.map(element => (
        <Input
            key={element.id}
            elementType={element.elementType}
            elementConfig={element.elementConfig}
            value={element.value}
            invalid={!element.valid}
            shouldValidate={element.validation}
            touched={element.touched}
            changed={(event) => inputChangedHandler(event, element.id)} />
    ));

    return (
        <div className={styles.authContainer}>
            <form>
                {inputs}
                <section>
                    <Button type="submit" btnType="success">SUBMIT</Button>
                </section>
            </form>
        </div>
    );
};

export default Auth;
