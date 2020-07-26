import React from "react";
import * as qs from "query-string";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";
import PrimarySearchAppBar from "./Appbar";
import Footer from "./Footer";
const Link = styled.a`
    text-decoration: none;
    color: white;
`;
const Linktwo = styled.a`
    text-decoration: none;
    color: black;
`;
const Content = styled.div`
    margin-left: 400px;
    margin-top: 200px;
`;
const primary = "#3f51b5";

class Stream extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        let cid = "oop9p00sz52axcloheko9usg5gnvto";
        let uri = "http://localhost:5000/Stream";
        let scope = "user_read";
        this.state = {
            live: false,
            token: false,
            link:
                "https://id.twitch.tv/oauth2/authorize?client_id=" +
                cid +
                "&redirect_uri=" +
                uri +
                "&response_type=token&scope=" +
                scope,
        };
        this.stream = this.stream.bind(this);
        this.endstream = this.endstream.bind(this);
    }
    stream() {
        fetch("/api/stream", {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                live: true,
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState(data);
            });
    }
    endstream() {
        fetch("/api/stream", {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                live: false,
            }),
        }) // send text box in the fetch box
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState(data);
            });
    }
    componentDidMount() {
        fetch("/api/stream", {
            credentials: "same-origin",
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState(data);
            });
    }

    render() {
        return (
            <div>
                <PrimarySearchAppBar />

                {this.state.token ? (
                    <Content>
                        {this.state.live ? (
                            <div>
                                <Typography variant="h1">
                                    You are live!
                                </Typography>
                                <Button
                                    variant="contained"
                                    color={primary}
                                    onClick={this.endstream}
                                    style={{ marginRight: "15px" }}>
                                    <Typography variant="h4">
                                        Click Here to End Live
                                    </Typography>
                                </Button>
                                <Button variant="contained" color="secondary">
                                    <Typography variant="h4">
                                        <Link href="/Home">Home</Link>
                                    </Typography>
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Typography variant="h1">
                                    You are not live
                                </Typography>
                                <Button
                                    variant="contained"
                                    color={primary}
                                    onClick={this.stream}
                                    style={{ marginRight: "15px" }}>
                                    <Typography variant="h4">
                                        Start Streaming On Mentii
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
                ) : (
                    <Content>
                        <Button
                            variant="contained"
                            color={primary}
                            style={{ marginRight: "15px" }}>
                            <Typography variant="h4">
                                <Linktwo href={this.state.link}>Login</Linktwo>
                            </Typography>
                        </Button>
                        <Button variant="contained" color="secondary">
                            <Typography variant="h4">
                                <Link href="/Home">Home</Link>
                            </Typography>
                        </Button>
                    </Content>
                )}
                <Footer />
            </div>
        );
    }
}

export default Stream;
