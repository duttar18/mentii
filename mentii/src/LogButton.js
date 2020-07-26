import React from "react";
import * as qs from 'query-string';
import { Button } from '@material-ui/core';

class LogButton extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = {
            'token' : false
        }
        this.logout = this.logout.bind(this);
    }
    logout(){
        fetch('/api/logout',{
            credentials: 'same-origin',
            method: 'GET'
        })
        .then((response) => {
          if(!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
            window.location.reload();
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
            <React.Fragment>
                {this.state.token ?
                <Button onClick={this.logout}>Logout</Button>
                :
                <Button><a href="/Login">Login</a></Button>
                }
            </React.Fragment>
            
        );
    }
}

export default LogButton;