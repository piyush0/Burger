export const getPrice = (ingredients, prices) => {
    const BASE_PRICE = 0.4;

    let ingredientsPrice = 0;
    Object.keys(ingredients).forEach(ing => ingredientsPrice += prices[ing] * ingredients[ing]);

    return BASE_PRICE + ingredientsPrice
};