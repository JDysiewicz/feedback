import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ChatBoard from "./components/ChatBoard";

import SplashScreen from "./components/SplashScreen";
import ChatBoard from "./components/ChatBoard";

const App: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={SplashScreen} />
                <Route path="/board" component={ChatBoard} />
            </Switch>
        </Router>
    );
};

export default App;