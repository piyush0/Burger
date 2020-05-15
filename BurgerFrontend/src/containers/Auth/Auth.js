import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from './Auth.module.css';
import {auth} from "../../store/actions";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import checkValidity from "../../utils/validate";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                valid: false,
                validations: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validations: {
                    required: true,
                    minLength: 6
                },
                touched: false
            },
        },
        isSignup: true
    };


    inputChangedHandler = (input, event) => {

        const updatedForm = {
            ...this.state.controls,
            [input]: {
                ...this.state.controls[input],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[input].validations),
                touched: true
            }
        };

        this.setState({controls: updatedForm})
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    };

    switchSignupHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    };


    render() {
        let inputs = [];

        for (let input in this.state.controls) {
            inputs.push(<Input
                shouldValidate={this.state.controls[input].validations && this.state.controls[input].touched}
                changed={this.inputChangedHandler.bind(this, input)}
                key={input} {...this.state.controls[input]} />)
        }

        let form = (<form onSubmit={this.submitHandler}>
            {inputs}
            <Button btnType="Success">Submit</Button>

        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        let error = null;
        if (this.props.error) {
            error = (<p>{this.props.error.message}</p>)
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            if (this.props.buildingBurger) {
                authRedirect = <Redirect to="/checkout"/>
            } else {
                authRedirect = <Redirect to="/"/>
            }
        }
        return (<div className={styles.Auth}>
            {authRedirect}
            {form}
            <Button clicked={this.switchSignupHandler} btnType="Danger">Switch to
                sign {this.state.isSignup ? 'in' : 'up'}</Button>
            {error}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burger.building
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);