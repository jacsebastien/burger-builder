import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});
const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

// function App(props) {
const App = (props) => {
    // Object destructuring to get only props we need to use
    const { onCheckAuthState } = props;

    useEffect(() => {
        onCheckAuthState();
    }, [onCheckAuthState]);

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* Redirect to Home page if no route mathes */}
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props} />} />
                <Route path="/orders" render={(props) => <Orders {...props} />} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        );
    }

    return (
        <Layout>
            <Suspense fallback={<Spinner />}>
                {routes}
            </Suspense>
        </Layout >
    );
};

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
