import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            if (httpClient.interceptors.request.request) {
                httpClient.interceptors.request.request.eject(reqInterceptor);
            }

            if (httpClient.interceptors.response.request) {
                httpClient.interceptors.response.request.eject(resInterceptor);
            }
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => setError(null);

    return [error, errorConfirmedHandler];
};
