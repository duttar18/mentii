import React from "react";
import { TwitchEmbed } from "react-twitch-embed";
import Footer from "./Footer";
import PrimarySearchAppBar from "./Appbar";
import styled from "styled-components";
const Content = styled.div`
    margin-left: 300px;
    margin-top: 100px;
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
        fetch("/api/stream?username=" + this.props.match.params.id, {
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
                        <h1>{this.state.title}</h1>
                        <p>{this.state.name}</p>
                        <img src={"/uploads/" + this.state.avatar} />
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
