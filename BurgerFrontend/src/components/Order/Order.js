import React from 'react';

import styles from './Order.module.css';

const order = props => {
    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({name: name, amount: props.ingredients[name]})
    }
    const ingredientsOutput = ingredients.map(ig => <span key={ig.name} style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }
    }>{ig.name} ({ig.amount})</span>);

    return (
        <div className={styles.Order}>
            <p> Ingredients: {ingredientsOutput}</p>
            <p> Price: ${props.price.toFixed(2)}</p>
        </div>
    )
};

export default order;