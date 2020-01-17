import React, { useState } from 'react';

import Button from '../../../components/UI/Button/Button';

import styles from './ContactData.module.css';

const ContactData = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    });

    return (
        <div className={styles.contactData}>
            <h4>Enter your contact data</h4>
            <form>
                <label>Name</label>
                <input type="text" name="name" />

                <label>Email</label>
                <input type="email" name="email" />

                <label>Street</label>
                <input type="text" name="street" />

                <label>Postal Code</label>
                <input type="text" name="postalCode" />

                <section>
                    <Button btnType="success">ORDER</Button>
                </section>
            </form>
        </div>
    );
};

export default ContactData;
