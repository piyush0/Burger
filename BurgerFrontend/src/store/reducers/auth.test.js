import reducer from "./auth";
import {AUTH_SUCCESS} from "../actions/actionTypes";

describe('test auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            userId: null,
            token: null
        })
    });

    it('should update token on auth success', () => {
       expect(reducer({
            loading: false,
            error: null,
            userId: null,
            token: null
        }, {
           type: AUTH_SUCCESS,
           token: 'some-token',
           userId: 'some-id'
       })).toEqual({
            loading: false,
            error: null,
            userId: 'some-id',
            token: 'some-token'
        })
    })
});