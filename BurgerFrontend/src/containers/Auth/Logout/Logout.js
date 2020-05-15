import React, { useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {authLogout} from "../../../store/actions/index";
import {connect} from "react-redux";

const Logout = props => {
    const {logout} = props;
    useEffect(() => {
        logout();
    }, [logout])

    return (<Redirect to="/"/>);

}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authLogout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);