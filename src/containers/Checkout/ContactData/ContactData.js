import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Axios from '../../../axios-orders';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const ContactData = (props) => {
    const [formState, setFormState] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Name'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Street'
            },
            value: ''
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'ZIP Code'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Country'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Email'
            },
            value: ''
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
            value: ''
        }
    });

    const [loadingState, setLoading] = useState(false);

    const orderHandler = (event) => {
        // Avoid page reloading when clicking on the button inside form tag
        event.preventDefault();

        setLoading(true);

        const formData = {};

        for(let key in formState) {
            formData[key] = formState[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData
        };

        Axios.post('orders.json', order)
            .then(() => {
                setLoading(false);
                props.history.push('/');
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...formState
        };
        // Deeply clone state elements
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedForm[inputIdentifier] = updatedFormElement;

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

    let form = (
        <form onSubmit={orderHandler}>
            {/* <Input inputtype="input" type="text" name="name" label="Name" /> */}
            {formElementsArray.map(element => (
                <Input
                    key={element.id}
                    elementType={element.elementType}
                    elementConfig={element.elementConfig}
                    value={element.value}
                    changed={(event) => inputChangedHandler(event, element.id)} />
            ))}

            <section>
                <Button type="submit" btnType="success">ORDER</Button>
            </section>
        </form>
    );

    if (loadingState) {
        form = <Spinner />;
    }

    return (
        <div className={styles.contactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
};

export default withRouter(ContactData);
