import React from 'react';
import BuildControl from "./BuildControl/BuildControl";
import styles from './BuildControls.module.css';
import PropTypes from 'prop-types'


const buildControls = props => (
    <div className={styles.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {Object.keys(props.ingredients).map(ctrl => {

            return <BuildControl quantity={props.ingredients[ctrl]}
                                 ingredientRemoved={props.ingredientRemoved.bind(this, ctrl)}
                                 ingredientAdded={props.ingredientAdded.bind(this, ctrl)} key={ctrl}
                                 label={ctrl.charAt(0).toUpperCase() + ctrl.slice(1)}/>
        })}

        <button onClick={props.purchasing} disabled={!props.purchasable}
                className={styles.OrderButton}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>

);

buildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.object.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    purchasing: PropTypes.func.isRequired,
    purchasable: PropTypes.bool.isRequired
};

export default buildControls;