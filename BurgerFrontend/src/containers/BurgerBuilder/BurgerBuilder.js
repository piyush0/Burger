import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withApiErrorHandler from "../../hoc/withApiErrorHandler/withApiErrorHandler";
import {connect} from "react-redux";
import {addIng, removeIng, fetchIngs, startPurchase} from "../../store/actions/index";
import {getPrice} from "../../utils/price";

export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.fetchIngredients();
    }


    isPurchasable = ingredients => {
        const totalIngredients = Object.values(ingredients).reduce((sum, el) => sum + el);
        return totalIngredients > 0
    };


    purchasingHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true})
        } else {
            this.props.history.push('/auth');
        }
    };

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseHandler = () => {
        this.props.startPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        let orderSummary = null;
        let burger = <Spinner/>;
        if (this.props.error) {
            burger = <p>Sorry!</p>
        }

        if (this.props.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BurgerControls
                    isAuth={this.props.isAuth}
                    purchasable={this.isPurchasable(this.props.ingredients)}
                    price={getPrice(this.props.ingredients, this.props.prices)}
                    ingredients={this.props.ingredients}
                    purchasing={this.purchasingHandler}
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}/></Aux>);

            orderSummary = (<OrderSummary price={getPrice(this.props.ingredients, this.props.prices)}
                                          ingredients={this.props.ingredients}
                                          purchaseCancelled={this.cancelPurchaseHandler}
                                          purchaseContinue={this.purchaseHandler}/>);
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        ingredients: store.burger.ingredients,
        prices: store.burger.prices,
        error: store.burger.error,
        isAuth: store.auth.token !== null
    }
};

const mapActionsToProps = (dispatcher) => {
    return {
        addIngredient: ingType => dispatcher(addIng(ingType)),
        removeIngredient: ingType => dispatcher(removeIng(ingType)),
        fetchIngredients: () => dispatcher(fetchIngs()),
        startPurchase: () => dispatcher(startPurchase())
    }
};


export default connect(mapStateToProps, mapActionsToProps)(withApiErrorHandler(BurgerBuilder, axios));