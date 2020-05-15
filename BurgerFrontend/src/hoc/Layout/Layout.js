import React, { useState} from 'react';
import Aux from "../Aux/Aux";
import styles from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const dismissSideDrawerHandler = () => {
        setShowSideDrawer(false);
    };

    const toggleSideDrawerHandler = () => {
        setShowSideDrawer(prevVal => !prevVal);
    };

    return (<Aux>
        <Toolbar isAuth={props.isAuth} toggleSideDrawer={toggleSideDrawerHandler}/>
        <SideDrawer isAuth={props.isAuth} open={showSideDrawer}
                    dismiss={dismissSideDrawerHandler}/>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>)
};


const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);