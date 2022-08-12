import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard"

//history
import { history } from './helpers/history';

//pages
import Menu from "./pages/Menu"
import LoginPage from "./pages/Login"
import Register from "./pages/Register"

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <RouteGuard
                    exact
                    path="/"
                    component={Menu}
                />
                <Route
                    path="/login"
                    component={LoginPage}
                />
                <Route
                    path="/register"
                    component={Register}
                />

                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default Routes