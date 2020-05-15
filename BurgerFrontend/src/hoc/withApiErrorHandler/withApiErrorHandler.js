import React, {Component} from "react";
import Aux from '../../hoc/Aux/Aux';
import Modal from "../../components/UI/Modal/Modal";

const withApiErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        reqInterceptors = null;
        resInterceptors = null;

        constructor(props) {
            super(props);
            this.reqInterceptors = axios.interceptors.request.use(response => {
                this.setState({error: null});
                return response;
            });

            this.resInterceptors = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
                return error;
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorDismissed = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed={this.errorDismissed}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default withApiErrorHandler;