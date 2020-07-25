import React from "react";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";
import "./App.css";
const Wrapper = styled.div`
    text-align: center;
    margin-top: 100px;
    top: 0;
    left: 0;
`;

const Colored = styled.span`
    color: #f06191;
`;
const Link = styled.a`
    text-decoration: none;
    color: white;
`;
const Welcome = () => {
    return (
        <Wrapper>
            <img src="https://i.postimg.cc/g2N9jGsx/Welcome-Prof.png"></img>
            <Typography variant="h1">
                Menti<Colored>i</Colored>
            </Typography>
            <Typography variant="h6">Find Your Mentor</Typography>
            <Button variant="contained" color="primary">
                Log in
            </Button>
            <Button variant="contained" color="secondary">
                <Link href="/Home">Get Started</Link>
            </Button>
        </Wrapper>
    );
};

export default Welcome;
