import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

function App(props) {
    useEffect(() => {
        props.onCheckAuthState();
    }, []);

    return (
        <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.authCheckState())
    };
};

export default connect(null, mapDispatchToProps)(App);
