import React from 'react';

import styles from './Input.module.css';

const input = props => {
    let inputElement;

    const inputClasses = [styles.InputElement];


    if (props.shouldValidate && !props.valid) {
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig}
                                  value={props.value}/>;
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig}
                                     value={props.value}/>;
            break;
        case 'select':
            inputElement = (<select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
                {props.elementConfig.options.map(option =>
                    (<option key={option.value} value={option.value}>{option.display}</option>)
                )}
            </select>);
            break;
        default:
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig}
                                  value={props.value}/>;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;