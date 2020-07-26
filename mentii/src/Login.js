import React from "react";
import * as qs from "query-string";
import { Button, Typography } from "@material-ui/core";
import PrimarySearchAppBar from "./Appbar";
import Footer from "./Footer";

import styled from "styled-components";
const Link = styled.a`
    text-decoration: none;
    color: white;
`;
const Linktwo = styled.a`
    text-decoration: none;
    color: black;
`;
const Content = styled.div`
    margin-left: 560px;
    margin-top: 300px;
`;
const primary = "#3f51b5";

class Login extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        let cid = "oop9p00sz52axcloheko9usg5gnvto";
        let uri = "http://localhost:5000/Login";
        let scope = "user_read";
        this.state = {
            token: false,
            link:
                "https://id.twitch.tv/oauth2/authorize?client_id=" +
                cid +
                "&redirect_uri=" +
                uri +
                "&response_type=token&scope=" +
                scope,
        };
    }
    componentDidMount() {
        const parsed = qs.parse(window.location.hash);
        fetch("/api/login?token=" + parsed["access_token"], {
            credentials: "same-origin",
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    this.props.history.push("/Home");
                }
                this.setState(data);
            })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    this.props.history.push("/Welcome");
                }
                this.setState(data);
            });
    }

    render() {
        return (
            <div>
                <PrimarySearchAppBar />
                <Content>
                    {this.state.token ? (
                        <Typography variant="h4">You are logged in!</Typography>
                    ) : (
                        <div>
                            <Button
                                variant="contained"
                                color={primary}
                                style={{ marginRight: "15px" }}>
                                <Typography variant="h4">
                                    <Linktwo href={this.state.link}>
                                        Login
                                    </Linktwo>
                                </Typography>
                            </Button>
                            <Button variant="contained" color="secondary">
                                <Typography variant="h4">
                                    <Link href="/Home">Home</Link>
                                </Typography>
                            </Button>
                        </div>
                    )}
                </Content>
                <Footer />
            </div>
        );
    }
}

export default Login;
