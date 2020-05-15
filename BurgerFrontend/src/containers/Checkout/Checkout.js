import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import Contact from "./Contact/Contact";
import {connect} from 'react-redux';

class Checkout extends Component {

    cancelledHandler = () => {
        this.props.history.goBack();
    };

    continuedHandler = () => {
        this.props.history.replace('/checkout/contact')
    };

    render() {
        console.log(this.props);
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients) {
            const redirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (<div>
                {redirect}
                <CheckoutSummary ingredients={this.props.ingredients} checkoutCancelled={this.cancelledHandler}
                                 checkoutContinued={this.continuedHandler}/>
                <Route path={this.props.match.url + '/contact'}
                       component={Contact}/>
            </div>);
        }

        return summary;
    }
}

const mapStateToProps = store => {
    return {
        ingredients: store.burger.ingredients,
        purchased: store.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);