import React from "react";
import * as qs from 'query-string';
import { Button } from '@material-ui/core';

class Stream extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);

        this.state = {
            'stream' : false,
            'token' : false
        }
        this.stream = this.stream.bind(this);
        this.endstream = this.endstream.bind(this);
    }
    stream(){
        fetch('/api/stream',{
            credentials: 'same-origin',
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "stream" : true
            })
        }) // send text box in the fetch box
        .then((response) => {
          if(!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            this.setState(data);
        })
    }
    endstream(){
        fetch('/api/stream',{
            credentials: 'same-origin',
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "stream" : false
            })
        }) // send text box in the fetch box
        .then((response) => {
          if(!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            this.setState(data);
        })
    }
    componentDidMount(){
        const parsed = qs.parse(window.location.hash);
        fetch('/api/stream',{
            credentials: 'same-origin',
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "token" : parsed['access_token']
            })
        })
        .then((response) => {
          if(!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            this.setState(data);
        })
    }

    render() {
        return (
            <div>
                {this.state.token ?
                <div>
                    {this.state.stream ?
                    <Button onClick={this.endstream}>Click to End Live</Button>
                    :
                    <Button onClick={this.stream}>Click to Stream</Button>
                    }
                </div>
                :
                <a href="https://id.twitch.tv/oauth2/authorize?client_id=oop9p00sz52axcloheko9usg5gnvto&redirect_uri=http:://localhost:5000/Stream&response_type=token&scope=user_read">Login</a>
                }

            </div>
        );
    }
}

export default Stream;