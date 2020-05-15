import React, { useEffect} from "react";
import Order from "../../components/Order/Order";

import {fetchOrders} from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import withApiErrorHandler from "../../hoc/withApiErrorHandler/withApiErrorHandler";
import axios from '../../axios-orders';

const Orders = props => {
    useEffect(() => {
        props.fetchOrders(props.token, props.userId);
    }, []);

    let orders = <Spinner/>;
    if (!props.loading) {
        orders = props.orders.map(order => {
            return <Order ingredients={order.ingredients} price={+order.price} key={order.id}/>
        });
    }
    return (
        <div>
            {orders}
        </div>
    )
};

const mapStateToProps = store => {
    return {
        orders: store.order.orders,
        loading: store.order.loading,
        token: store.auth.token,
        userId: store.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withApiErrorHandler(Orders, axios));