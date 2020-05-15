import {ADD_ING, FETCH_INGS, FETCH_INGS_ERROR, REMOVE_ING, SET_INGS} from "./actionTypes";

export const addIng = ingType => {
    return {type: ADD_ING, ingType: ingType}
};
export const removeIng = ingType => {
    return {type: REMOVE_ING, ingType: ingType}
};


export const setIngs = (ingredients, prices) => {
    return {type: SET_INGS, ingredients: ingredients, prices: prices}
};

export const fetchIngredientsError = () => {
    return {type: FETCH_INGS_ERROR}
};

export const fetchIngs = () => {
    return {type: FETCH_INGS}
};