import axios from "../../axios-orders";
import {put} from "redux-saga/effects";
import {fetchIngredientsError, setIngs} from "../actions/burgerBuilder";

export function* fetchIngs(action) {
    console.log('hello')
    const response = yield axios.get('/ingredients.json');
    if (response.status < 400) {
        let ingredients = {};
        for (let key in response.data) {
            ingredients[key] = 0;
        }
        yield put(setIngs(ingredients, response.data));
    } else {
        yield put(fetchIngredientsError());
    }

}