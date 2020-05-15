import {AUTH_FAILED, AUTH_LOADING, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initState = {
    loading: false,
    error: null,
    userId: null,
    token: null
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.token,
                userId: action.userId
            };
        case AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        default:
            return state
    }
};

export default reducer;
