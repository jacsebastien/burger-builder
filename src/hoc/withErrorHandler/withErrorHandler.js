/* eslint-disable react/display-name */
import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, Axios) => {
    // return anonymous class
    return class extends Component {
        state = {
            error: null
        };

        reqInterceptor = Axios.interceptors.request.use(req => {
            this.setState({ error: null });
            return req;
        });

        resInterceptor = Axios.interceptors.response.use(res => res, error => {
            this.setState({ error: error });
        });

        componentWillUnmount() {
            Axios.interceptors.request.request.eject(this.reqInterceptor);
            Axios.interceptors.response.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => this.setState({ error: null })

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withErrorHandler;
