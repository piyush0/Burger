import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import Contact from "./Contact/Contact";
import {connect} from 'react-redux';

const Checkout = props => {
    const cancelledHandler = () => {
        props.history.goBack();
    };

    const continuedHandler = () => {
        props.history.replace('/checkout/contact')
    };
    let summary = <Redirect to="/"/>;
    if (props.ingredients) {
        const redirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (<div>
            {redirect}
            <CheckoutSummary ingredients={props.ingredients} checkoutCancelled={cancelledHandler}
                             checkoutContinued={continuedHandler}/>
            <Route path={props.match.url + '/contact'}
                   component={Contact}/>
        </div>);
    }

    return summary;
};

const mapStateToProps = store => {
    return {
        ingredients: store.burger.ingredients,
        purchased: store.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);