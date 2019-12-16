import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <Fragment>
                <Burger />
                <section>Build Controls</section>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
