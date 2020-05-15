import {put, call} from "redux-saga/effects";
import {
    authFailure,
    authLoading as authLoadingAction, authLogout,
    authSuccess,
    checkAuthTimeout,
    logout as logoutAction
} from "../actions/auth";
import {delay} from "redux-saga/effects";
import axios from "axios";

export function* logout(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'expirationDate');

    yield put(logoutAction())

}

export function* checkTimeout(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logoutAction())
}

export function* auth(action) {
    yield put(authLoadingAction());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAA5Rir75qNR6dQvLENf4wh0zw0rlV7dL8';
    if (action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAA5Rir75qNR6dQvLENf4wh0zw0rlV7dL8'
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + parseInt(response.data.expiresIn) * 1000);

        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate.getTime());

        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
        yield put(authFailure(err.response.data.error))
    }
}

export function* fetchAuth(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(authLogout());
    } else {
        const expirationDate = parseInt(localStorage.getItem('expirationDate'));
        if (expirationDate < Date.now()) {
            yield put(authLogout());
        } else {
            const userId = localStorage.getItem('userId');
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout((expirationDate - Date.now()) / 1000));
        }
    }
}