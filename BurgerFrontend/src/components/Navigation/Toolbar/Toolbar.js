import React from 'react';

import styles from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Hamburger from "../../UI/Hamburger/Hamburger";

const toolbar = props => {
    const logoStyle = {
        height: "80%"
    };
    return (<header className={styles.Toolbar}>
        <Hamburger clicked={props.toggleSideDrawer}/>
        <Logo customStyle={logoStyle}/>
        <div className={styles.DesktopOnly}>
            <NavigationItems isAuth = { props.isAuth}/>
        </div>
    </header>)
};

export default toolbar;