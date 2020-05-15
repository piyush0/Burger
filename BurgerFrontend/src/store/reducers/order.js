import {
    LOADING,
    ORDERS_FAILED,
    ORDERS_SUCCESS,
    PURCHASE_FAILED,
    PURCHASE_SUCCESS,
    START_PURCHASE
} from "../actions/actionTypes";

const initState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_PURCHASE:
            return {
                ...state,
                purchased: false
            };
        case PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true
            };
        case PURCHASE_FAILED:
            return {
                ...state,
                loading: false,
            };
        case LOADING:
            return {
                ...state,
                loading: action.loading
            };

        case ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            };

        case ORDERS_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return {
                ...state
            }
    }
};

export default reducer;