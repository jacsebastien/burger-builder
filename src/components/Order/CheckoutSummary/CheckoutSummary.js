import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={styles.checkoutSummary}>
            <h1>We hope it tastes well !</h1>
            <section className={styles.burgerBlock}>
                <Burger ingredients={props.ingredients}/>
            </section>
            <Button btnType="danger">CANCEL</Button>
            <Button btnType="success">CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;
