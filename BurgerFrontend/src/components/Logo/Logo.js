import React from 'react';

import burgerLogo from '../../assets/images/burger.png';
import styles from './Logo.module.css';
import {withRouter} from "react-router-dom";



const logo = withRouter(props => (
  <div className={styles.Logo} style={props.customStyle} onClick={() => {props.history.push('/')}}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
));

export default logo;