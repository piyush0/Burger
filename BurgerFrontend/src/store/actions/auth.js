import {
    AUTH,
    AUTH_CHECK_TIMEOUT,
    AUTH_FAILED,
    AUTH_INITIATE_LOGOUT,
    AUTH_LOADING,
    AUTH_LOGOUT,
    AUTH_SUCCESS, FETCH_AUTH
} from "./actionTypes";


export const authLoading = () => {
    return {
        type: AUTH_LOADING
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFailure = error => {
    return {
        type: AUTH_FAILED,
        error: error
    };
};

export const authLogout = () => {
    return {
        type: AUTH_INITIATE_LOGOUT
    }
};

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const auth = (email, password, isSignup) => {
    return {
        type: AUTH,
        email:email,
        password:password,
        isSignup: isSignup
    };
};

export const fetchAuthState = () => {
    return {
        type: FETCH_AUTH,
    }
};