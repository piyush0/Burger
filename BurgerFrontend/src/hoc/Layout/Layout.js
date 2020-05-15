import React, {Component} from 'react';
import Aux from "../Aux/Aux";
import styles from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        'showSideDrawer': false
    };

    dismissSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    };

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })

    };

    render() {
        return (<Aux>
            <Toolbar isAuth={this.props.isAuth} toggleSideDrawer={this.toggleSideDrawerHandler}/>
            <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer}
                        dismiss={this.dismissSideDrawerHandler}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);