import React from "react";
import { TwitchEmbed } from "react-twitch-embed";

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
                {this.state.live ?
                    <div>
                        <TwitchEmbed channel={this.state.username} withChat={true} />
                        <h1>{this.state.title}</h1>
                        <p>{this.state.name}</p>
                        <img src={"/uploads/" + this.state.avatar}/>
                    </div>                    
                :
                    <div>{this.props.match.params.id} is not live</div>
                }
            </React.Fragment>
        );
    }
}

export default Watch;
