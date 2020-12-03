import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import RouteValidator from "./components/RouteValidator";

import "./styles/index.scss";
import Error404Page from "./components/Error404Page";

// Entry point for the client-side. Will display a component based on the path provided
const App: React.FC = () => {

    return (
        <div className="App-main-div">
            <Router>
                <Switch>
                    <Route exact path="/" component={SplashScreen} />
                    <Route path="/board" component={RouteValidator} />
                    <Error404Page />
                </Switch>
            </Router>
        </div>
    );
};

export default App;