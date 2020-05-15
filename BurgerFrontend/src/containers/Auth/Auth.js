import React, { useState} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from './Auth.module.css';
import {auth} from "../../store/actions";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import checkValidity from "../../utils/validate";


const Auth = props => {
    const [controls, setContols] = useState({
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
    });
    const [isSignup, setIsSignup] = useState(true);

    const inputChangedHandler = (input, event) => {
        const updatedForm = {
            ...controls,
            [input]: {
                ...controls[input],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[input].validations),
                touched: true
            }
        };
        setContols(updatedForm);
    };

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    };

    const switchSignupHandler = () => {
        setIsSignup(prevIsSingup => !prevIsSingup);
    };


    let inputs = [];

    for (let input in controls) {
        inputs.push(<Input
            shouldValidate={controls[input].validations && controls[input].touched}
            changed={inputChangedHandler.bind(this, input)}
            key={input} {...controls[input]} />)
    }

    let form = (<form onSubmit={submitHandler}>
        {inputs}
        <Button btnType="Success">Submit</Button>

    </form>);
    if (props.loading) {
        form = <Spinner/>
    }
    let error = null;
    if (props.error) {
        error = (<p>{props.error.message}</p>)
    }

    let authRedirect = null;

    if (props.isAuth) {
        if (props.buildingBurger) {
            authRedirect = <Redirect to="/checkout"/>
        } else {
            authRedirect = <Redirect to="/"/>
        }
    }
    return (<div className={styles.Auth}>
        {authRedirect}
        {form}
        <Button clicked={switchSignupHandler} btnType="Danger">Switch to
            sign {isSignup ? 'in' : 'up'}</Button>
        {error}
    </div>);

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