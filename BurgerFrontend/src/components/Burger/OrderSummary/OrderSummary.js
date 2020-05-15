import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from "../../UI/Button/Button";

const orderSummary = props => {

    const list = Object.keys(props.ingredients).map(el =>
        <li key={el}><span style={{"textTransform": "capitalize"}}>{el}</span>: {props.ingredients[el]}</li>
    );

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {list}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>)
};

export default orderSummary;