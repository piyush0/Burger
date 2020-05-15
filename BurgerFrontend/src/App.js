import React, {Component, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import {fetchAuthState} from "./store/actions";
import {connect} from "react-redux";

const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
    componentDidMount() {
        this.props.fetchAuthState();
    }


    render() {

        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/auth"
                       render={() => <Suspense fallback={<div>Loading..</div>}><Auth/></Suspense>}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (<Switch>
                <Route path="/checkout"
                       render={(props) => <Suspense fallback={<div>Loading..</div>}><Checkout {...props}/></Suspense>}/>
                <Route path="/orders"
                       render={(props) => <Suspense fallback={<div>Loading..</div>}><Orders {...props}/></Suspense>}/>
                <Route path="/auth"
                       render={(props) => <Suspense fallback={<div>Loading..</div>}><Auth {...props}/></Suspense>}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>)
        }
        return (
            <BrowserRouter>
                <Layout>
                    {routes}
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAuthState: () => dispatch(fetchAuthState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
