import {takeEvery, all} from "redux-saga/effects";
import {
    AUTH,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT,
    FETCH_AUTH,
    FETCH_INGS,
    FETCH_ORDERS,
    PURCHASE
} from "../actions/actionTypes";
import {auth, checkTimeout, fetchAuth, logout} from "./auth";
import {fetchIngs} from "./burgerBuilder";
import {fetchOrders, purchase} from "./orders";


export function* watchAuth() {
    yield all([takeEvery(AUTH_INITIATE_LOGOUT, logout), takeEvery(AUTH_CHECK_TIMEOUT, checkTimeout), takeEvery(AUTH, auth), takeEvery(FETCH_AUTH, fetchAuth)])
}

export function* watchBurgerBuilder() {
    yield takeEvery(FETCH_INGS, fetchIngs)
}

export function* watchOrders() {
    yield takeEvery(PURCHASE, purchase)
    yield takeEvery(FETCH_ORDERS, fetchOrders)
}