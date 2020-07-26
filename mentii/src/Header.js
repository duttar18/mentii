import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1,
    },
}));

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'token': false,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        fetch("/api/login", {
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
    login(){
        this.props.history.push("/Login");
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
    render(){
        const classes = useStyles();
        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography className={classes.typographyStyles}>
                        Mentii
                    </Typography>
                    <PersonIcon />



                </Toolbar>
            </AppBar>
        );
    }
    
};

export default Header;
