import React, { useState} from "react";
import styles from './Contact.module.css';
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import {connect} from 'react-redux';
import {getPrice} from '../../../utils/price';
import withApiErrorHandler from "../../../hoc/withApiErrorHandler/withApiErrorHandler";
import {purchase} from "../../../store/actions/index";
import checkValidity from "../../../utils/validate";

const Contact = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            valid: false,
            validations: {
                required: true
            },
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            valid: false,
            validations: {
                required: true
            },
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Zip Code'
            },
            value: '',
            valid: false,
            validations: {
                required: true,
                minLength: 5,
                maxLength: 6
            },
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            valid: false,
            validations: {
                required: true
            },
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            valid: false,
            validations: {
                required: true
            },
            touched: false
        },
        delivery: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', display: 'Fastest'},
                    {value: 'cheapest', display: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validations: {},
            valid: true,
            touched: true
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const contact = {};
        for (let input in orderForm) {
            contact[input] = orderForm[input].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: getPrice(props.ingredients, props.prices),
            contact: contact,
            userId: props.userId
        };
        props.purchaseHandler(order, props.token);

    };

    const inputChangedHandler = (input, event) => {

        const updatedForm = {...orderForm};
        const updatedElement = {...updatedForm[input]};
        updatedElement.value = event.target.value;

        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validations);

        updatedElement.touched = true;
        updatedForm[input] = updatedElement;
        setOrderForm(updatedForm);
        setFormIsValid(isFormValid(updatedForm));
    };

    const isFormValid = form => {
        let isValid = true;
        for (let input in form) {
            if (form[input].validations) {
                isValid = form[input].valid && isValid;
            }
        }

        return isValid;
    };


    let inputs = [];

    for (let input in orderForm) {
        inputs.push(<Input
            shouldValidate={orderForm[input].validations && orderForm[input].touched}
            changed={inputChangedHandler.bind(this, input)}
            key={input} {...orderForm[input]} />)
    }

    let form = (<form>
        {inputs}
        <Button disabled={!formIsValid} clicked={orderHandler} btnType='Success'>ORDER</Button>
    </form>);
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={styles.Contact}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        prices: state.burger.prices,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        purchaseHandler: (order, token) => dispatch(purchase(order, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withApiErrorHandler(Contact, axios));