import React from "react";
import { TwitchEmbed } from "react-twitch-embed";
import Footer from "./Footer";
import PrimarySearchAppBar from "./Appbar";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
const Content = styled.div`
    margin-left: 250px;
    margin-top: 70px;
`;
class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            title: false,
            profile: "",
            live: false,
        };
    }
    componentDidMount() {
        fetch("/api/getstream?username=" + this.props.match.params.id, {
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
            <React.Fragment>
                <PrimarySearchAppBar />
                {this.state.live ? (
                    <Content>
                        <TwitchEmbed
                            channel={this.state.username}
                            withChat={true}
                        />
                        <Typography variant="h6">{this.state.name}</Typography>
                    </Content>
                ) : (
                    <div>{this.props.match.params.id} is not live</div>
                )}
                <Footer />
            </React.Fragment>
        );
    }
}

export default Watch;
