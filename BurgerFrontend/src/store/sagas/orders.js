import axios from "../../axios-orders";
import {ordersFailed, ordersSuccess, purchaseFailure, purchaseSuccess, setLoading} from "../actions/orders";
import {put} from "redux-saga/effects";

export function* purchase(action) {
    yield put(setLoading(true));
    try {
        yield axios.post('/orders.json?auth=' + action.token, action.order)
        yield put(purchaseSuccess());
    } catch (err) {
        yield put(purchaseFailure(err))
    }

}

export function* fetchOrders(action) {
    yield put(setLoading(true));
    const queryParam = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get('/orders.json' + queryParam)
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                id: key,
                ...res.data[key]
            })
        }
        yield put(ordersSuccess(fetchedOrders))
    } catch (err) {
        yield put(ordersFailed(err))
    }
}