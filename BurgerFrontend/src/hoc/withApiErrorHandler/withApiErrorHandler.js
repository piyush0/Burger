import React from "react";
import Aux from '../../hoc/Aux/Aux';
import Modal from "../../components/UI/Modal/Modal";

import useHttpError from "../../hooks/http_error";

const withApiErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, errorDismissed] = useHttpError(axios);
        return (
            <Aux>
                <Modal show={error}
                       modalClosed={errorDismissed}>{error ? error.message : null}</Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )

    }
};

export default withApiErrorHandler;