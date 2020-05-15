import React, {useCallback, useEffect, useState} from 'react';
import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withApiErrorHandler from "../../hoc/withApiErrorHandler/withApiErrorHandler";
import {connect, useDispatch, useSelector} from "react-redux";
import {addIng, removeIng, fetchIngs, startPurchase} from "../../store/actions/index";
import {getPrice} from "../../utils/price";


export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatcher = useDispatch();
    const addIngredient = ingType => dispatcher(addIng(ingType));
    const removeIngredient = ingType => dispatcher(removeIng(ingType));
    const fetchIngredients = useCallback(() => dispatcher(fetchIngs()),[]);
    const startPurchasing = () => dispatcher(startPurchase());

    const ingredients = useSelector(store => store.burger.ingredients);
    const prices = useSelector(store => store.burger.prices);
    const error = useSelector(store => store.burger.error);
    const isAuth = useSelector(store => store.auth.token !== null);

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);


    const isPurchasable = ingredients => {
        const totalIngredients = Object.values(ingredients).reduce((sum, el) => sum + el);
        return totalIngredients > 0
    };


    const purchasingHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            props.history.push('/auth');
        }
    };

    const cancelPurchaseHandler = () => {
        setPurchasing(false);
    };

    const purchaseHandler = () => {
        startPurchasing();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    let burger = <Spinner/>;
    if (error) {
        burger = <p>Sorry!</p>
    }

    if (ingredients) {
        burger = (<Aux>
            <Burger ingredients={ingredients}/>
            <BurgerControls
                isAuth={isAuth}
                purchasable={isPurchasable(ingredients)}
                price={getPrice(ingredients, prices)}
                ingredients={ingredients}
                purchasing={purchasingHandler}
                ingredientAdded={addIngredient}
                ingredientRemoved={removeIngredient}/></Aux>);

        orderSummary = (<OrderSummary price={getPrice(ingredients, prices)}
                                      ingredients={ingredients}
                                      purchaseCancelled={cancelPurchaseHandler}
                                      purchaseContinue={purchaseHandler}/>);
    }


    return (
        <Aux>
            <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
};


// const mapStateToProps = (store) => {
//     return {
//         ingredients: store.burger.ingredients,
//         prices: store.burger.prices,
//         error: store.burger.error,
//         isAuth: store.auth.token !== null
//     }
// };
//
// // const mapActionsToProps = (dispatcher) => {
// //     return {
// //         addIngredient: ingType => dispatcher(addIng(ingType)),
// //         removeIngredient: ingType => dispatcher(removeIng(ingType)),
// //         fetchIngredients: () => dispatcher(fetchIngs()),
// //         startPurchase: () => dispatcher(startPurchase())
// //     }
// // };
//

export default (withApiErrorHandler(BurgerBuilder, axios));