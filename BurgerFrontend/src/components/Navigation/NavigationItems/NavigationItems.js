import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
    <nav className={styles.Navigation}>
        <ul className={styles.NavigationItems}>
            <NavigationItem exact link={"/"}>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link={"/orders"}>Orders</NavigationItem> : null}
            {props.isAuth ? <NavigationItem link={"/logout"}>Logout</NavigationItem> :
                <NavigationItem link={"/auth"}>Login</NavigationItem>}

        </ul>
    </nav>
);

export default navigationItems;