import React from "react";
import { Grid, Button } from "@material-ui/core";
import Header from "./Header";
import Content from "./Content";
import styled from "styled-components";
import Welcome from "./Welcome";
import Home from "./Home";
import Watch from "./Watch"
import Login from "./Login"
import Stream from "./Stream";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Profile";

import "./App.css";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/Welcome" component={Welcome} />
                    <Route path="/Watch/:id" component={Watch} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Stream" component={Stream} />
                    <Route path="/Profile" component={Profile} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
