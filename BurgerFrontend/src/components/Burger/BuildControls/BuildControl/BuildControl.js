import React from 'react';

import styles from './BuildControl.module.css';

import PropTypes from 'prop-types';

const buildControl = props => (

    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={props.ingredientRemoved} disabled={props.quantity <= 0}>Less</button>
        <button className={styles.More} onClick={props.ingredientAdded}>More</button>
    </div>
);

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
};

export default buildControl;