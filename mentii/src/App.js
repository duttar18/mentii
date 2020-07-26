import React from "react";
import { Grid, Button } from "@material-ui/core";
import Header from "./Header";
import Content from "./Content";
import styled from "styled-components";
import Welcome from "./Welcome";
import Home from "./Home";
import Stream from "./Stream";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/Welcome" component={Welcome} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Stream" component={Stream} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
