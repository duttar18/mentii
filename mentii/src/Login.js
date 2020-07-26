import React from "react";
import * as qs from 'query-string';
import { Button } from '@material-ui/core';

class Login extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        let cid = "oop9p00sz52axcloheko9usg5gnvto";
        let uri = "http://localhost:5000/Login";
        let scope = "user_read";
        this.state = {
            'token' : false,
            'link' : 'https://id.twitch.tv/oauth2/authorize?client_id='+cid+'&redirect_uri='+uri+'&response_type=token&scope='+scope
        }

    }
    componentDidMount(){
        const parsed = qs.parse(window.location.hash);
        fetch('/api/login?token='+parsed['access_token'],{
            credentials: 'same-origin',
            method: 'GET'
        })
        .then((response) => {
          if(!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            if(data.token){
                this.props.history.push("/Home");
            }
            this.setState(data);
        })
    }

    render() {
        return (
            <div>
                {this.state.token ?
                <div>
                    You are logged in!
                </div>
                :
                <a href={this.state.link}>Login</a>
                }

            </div>
        );
    }
}

export default Login;