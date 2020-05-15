import {
    FETCH_ORDERS,
    LOADING,
    ORDERS_FAILED,
    ORDERS_SUCCESS,
    PURCHASE,
    PURCHASE_FAILED,
    PURCHASE_SUCCESS,
    START_PURCHASE
} from "./actionTypes";

export const purchaseSuccess = () => {
    return {
        type: PURCHASE_SUCCESS,
    }
};

export const purchaseFailure = error => {
    return {
        type: PURCHASE_FAILED,
        error: error
    }
};

export const setLoading = loading => {
    return {
        type: LOADING,
        loading: loading
    }
};

export const purchase = (order, token) => {
    return {
        type: PURCHASE,
        order: order,
        token: token
    }
};

export const startPurchase = () => {
    return {
        type: START_PURCHASE
    }
};

export const fetchOrders = (token, userId) => {
    return {
        type:FETCH_ORDERS,
        token:token,
        userId: userId
    }
};

export const ordersSuccess = orders => {
    return {
        type: ORDERS_SUCCESS,
        orders: orders
    }
};

export const ordersFailed = err => {
    return {
        type: ORDERS_FAILED,
        error: err
    }
};