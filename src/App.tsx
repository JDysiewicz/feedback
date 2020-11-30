import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ChatBoard from "./components/ChatBoard";

import SplashScreen from "./components/SplashScreen";
import ChatBoard from "./components/ChatBoard";

import "./styles/index.scss";

const App: React.FC = () => {

    return (
        <div className="App-main-div">
            <Router>
                <Switch>
                    <Route exact path="/" component={SplashScreen} />
                    <Route path="/board" component={ChatBoard} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;