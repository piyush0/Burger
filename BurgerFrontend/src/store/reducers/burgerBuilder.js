import * as actionTypes from '../actions/actionTypes';

const initState = {
    ingredients: null,
    prices: null,
    error: null,
    building: false
};

const burgerBuilder = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ING: {
            const newIngredients = {...state.ingredients};
            newIngredients[action.ingType] = newIngredients[action.ingType] + 1;

            return {...state, ingredients: newIngredients, building: true}
        }

        case actionTypes.REMOVE_ING: {
            if (state.ingredients[action.ingType] <= 0) {
                return state;
            }

            const newIngredients = {...state.ingredients};
            newIngredients[action.ingType] = newIngredients[action.ingType] - 1;

            return {...state, ingredients: newIngredients, building: true}
        }

        case actionTypes.SET_INGS: {
            return {...state, ingredients: action.ingredients, prices: action.prices, error: false, building: false}
        }


        case actionTypes.FETCH_INGS_ERROR: {
            return {...state, error: true}
        }

        default: return state

    }
};

export default burgerBuilder;