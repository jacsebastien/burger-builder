import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Axios from '../../../axios-orders';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const ContactData = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    });

    const [loadingState, setLoading] = useState(false);

    const orderHandler = (event) => {
        // Avoid page reloading when clicking on the button inside form tag
        event.preventDefault();

        setLoading(true);

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: {
                name: 'Seb',
                address: {
                    street: 'Test street 4',
                    zipCode: '5468',
                    country: 'Belgium'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
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

    let form = (
        <form>
            <Input inputtype="input" type="text" name="name" label="Name"/>
            <Input inputtype="input" type="email" name="email" label="Email"/>
            <Input inputtype="input" type="text" name="street" label="Street"/>
            <Input inputtype="input" type="text" name="postalCode" label="Postal Code"/>

            <section>
                <Button btnType="success" clicked={orderHandler}>ORDER</Button>
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
