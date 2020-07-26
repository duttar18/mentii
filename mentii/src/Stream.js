import React from "react";
import * as qs from 'query-string';
import { Button } from '@material-ui/core';

class Stream extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        let cid = "oop9p00sz52axcloheko9usg5gnvto";
        let uri = "http://localhost:5000/Stream";
        let scope = "user_read";
        this.state = {
            'live' : false,
            'token' : false,
            'link' : 'https://id.twitch.tv/oauth2/authorize?client_id='+cid+'&redirect_uri='+uri+'&response_type=token&scope='+scope
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
                "live" : true
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
    endstream(){
        fetch('/api/stream',{
            credentials: 'same-origin',
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "live" : false
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
        fetch('/api/login',{
            credentials: 'same-origin',
            method: 'GET'
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
                    {this.state.live ?
                    <div>
                        You are live!
                        <Button onClick={this.endstream}>Click to End Live</Button>
                    </div>                    
                    :
                    <div>
                        You are not live
                        <Button onClick={this.stream}>Click to Stream</Button>
                    </div>                    
                    }
                </div>
                :
                <a href={this.state.link}>Login</a>
                }

            </div>
        );
    }
}

export default Stream;