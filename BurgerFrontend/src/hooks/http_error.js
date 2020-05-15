import {useEffect, useState} from "react";

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptors = httpClient.interceptors.request.use(response => {
        setError(null);
        return response;
    });

    const resInterceptors = httpClient.interceptors.response.use(response => response, error => {
        setError(null);
        return error;
    });

    useEffect(() => {
        return () => {

            httpClient.interceptors.request.eject(reqInterceptors);
            httpClient.interceptors.response.eject(resInterceptors);
        }
    }, [reqInterceptors, resInterceptors]);

    const errorDismissed = () => {
        setError(null);
    };

    return [error, errorDismissed]
}