/* eslint-disable react/display-name */
import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, Axios) => {
    // return anonymous class
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = Axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = Axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                if (Axios.interceptors.request.request) {
                    Axios.interceptors.request.request.eject(reqInterceptor);
                }

                if (Axios.interceptors.response.request) {
                    Axios.interceptors.response.request.eject(resInterceptor);
                }
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => setError(null);

        return (
            <Fragment>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;
