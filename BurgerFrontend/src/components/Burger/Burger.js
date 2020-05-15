import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
    let ingredients = [];

    Object.keys(props.ingredients).forEach(ing => {
        [...Array(props.ingredients[ing])].forEach((_, i) => ingredients.push(
            <BurgerIngredient key={ing + i} type={ing}/>
        ));
    });

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type={"bread-top"}/>
            {ingredients}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    )
};

export default Burger;