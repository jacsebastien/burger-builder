import React, { useState } from 'react';
import { connect } from 'react-redux';

import Axios from '../../../axios-orders';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

const ContactData = (props) => {
    const [formState, setFormState] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', display: 'Fastest' },
                    { value: 'cheapest', display: 'Cheapest' }
                ],
                label: 'Delivery Method'
            },
            value: 'fastest',
            validation: {},
            valid: true,
            touched: false
        }
    });

    const [formIsValidState, setFormValidity] = useState(false);

    const orderHandler = (event) => {
        // Avoid page reloading when clicking on the button inside form tag
        event.preventDefault();

        const formData = {};

        for (let key in formState) {
            formData[key] = formState[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData
        };

        props.onOrderBurger(order);
    };

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
        const updatedForm = { ...formState };
        // Deeply clone state elements
        const updatedFormElement = { ...updatedForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        const formIsValid = Object.keys(updatedForm).reduce((isValid, key) => {
            return isValid && updatedForm[key].valid;
        }, true);

        setFormState(updatedForm);
        setFormValidity(formIsValid);
    };

    // RENDER //
    const formElementsArray = Object.keys(formState)
        .map(key => {
            return {
                ...formState[key],
                id: key
            };
        });

    let form = (
        <form onSubmit={orderHandler}>
            {/* <Input inputtype="input" type="text" name="name" label="Name" /> */}
            {formElementsArray.map(element => (
                <Input
                    key={element.id}
                    elementType={element.elementType}
                    elementConfig={element.elementConfig}
                    value={element.value}
                    invalid={!element.valid}
                    shouldValidate={element.validation}
                    touched={element.touched}
                    changed={(event) => inputChangedHandler(event, element.id)} />
            ))}

            <section>
                <Button type="submit" btnType="success" disabled={!formIsValidState}>ORDER</Button>
            </section>
        </form>
    );

    if (props.isLoading) {
        form = <Spinner />;
    }

    return (
        <div className={styles.contactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isLoading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchase(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));
