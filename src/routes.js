import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/Auth Helpers/RouteGuard"

//history
import { history } from './helpers/history';

//pages
import Menu from "./pages/Menu"
import LoginAndRegistration from "./pages/LoginAndRegistration";

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
                    component={LoginAndRegistration}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default Routes