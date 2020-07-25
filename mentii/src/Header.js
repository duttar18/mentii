import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1,
    },
}));

const Header = () => {
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
};

export default Header;
