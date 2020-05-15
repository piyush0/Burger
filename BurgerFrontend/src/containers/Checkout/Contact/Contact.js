import React, {Component} from "react";
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

class Contact extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false
    };


    orderHandler = (event) => {
        event.preventDefault();

        const contact = {};
        for (let input in this.state.orderForm) {
            contact[input] = this.state.orderForm[input].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: getPrice(this.props.ingredients, this.props.prices),
            contact: contact,
            userId: this.props.userId
        };
        this.props.purchaseHandler(order, this.props.token);

    };

    inputChangedHandler = (input, event) => {

        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[input]};
        updatedElement.value = event.target.value;

        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validations);

        updatedElement.touched = true;
        updatedForm[input] = updatedElement;
        this.setState({orderForm: updatedForm, formIsValid: this.isFormValid(updatedForm)});
    };

    isFormValid = form => {
        let isValid = true;
        for (let input in form) {
            if (form[input].validations) {
                isValid = form[input].valid && isValid;
            }
        }

        return isValid;
    };

    render() {
        let inputs = [];

        for (let input in this.state.orderForm) {
            inputs.push(<Input
                shouldValidate={this.state.orderForm[input].validations && this.state.orderForm[input].touched}
                changed={this.inputChangedHandler.bind(this, input)}
                key={input} {...this.state.orderForm[input]} />)
        }

        let form = (<form>
            {inputs}
            <Button disabled={!this.state.formIsValid} clicked={this.orderHandler} btnType='Success'>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={styles.Contact}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )

    }
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