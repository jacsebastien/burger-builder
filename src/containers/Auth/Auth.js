import React, { useState } from 'react';

import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

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
    const [isSignup, setSignupState] = useState(false);

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

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(formState.email.value, formState.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setSignupState(prevState => !prevState);
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
            <h1>{isSignup ? 'SIGNUP' : 'SIGNIN'}</h1>
            <form onSubmit={submitHandler}>
                {inputs}
                <section>
                    <Button type="submit" btnType="success">SUBMIT</Button>
                </section>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(null, mapDispatchToProps)(Auth);
