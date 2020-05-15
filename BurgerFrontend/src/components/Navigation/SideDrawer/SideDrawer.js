import React from 'react';

import styles from './SideDrawer.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
    const logoStyles = {
        height: "11%",
        marginBottom: "32px"
    };

    const sideDrawerClasses = [styles.SideDrawer];

    if (props.open) {
        sideDrawerClasses.push(styles.Open)
    } else {
        sideDrawerClasses.push(styles.Close)
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.dismiss}/>
            <div className={sideDrawerClasses.join(' ')} onClick={props.dismiss}>
                <Logo customStyle={logoStyles} height="11%"/>
                <NavigationItems isAuth={props.isAuth}/>
            </div>
        </Aux>
    )
};

export default sideDrawer;