import React from "react";
import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from '@material-ui/core/IconButton';
import styled from "styled-components";
import PrimarySearchAppBar from "./Appbar";
import Footer from "./Footer";

const Wrapper = styled.div`
    text-align: center;
    margin-top: 100px;
    top: 0;
    left: 0;
`;

const Link = styled.a`
    text-decoration: none;
    color: white;
`;

const Profile = () => {
    return (
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <Wrapper>
                <Card>
                    <img src="https://i.postimg.cc/Qxt1VSSb/DSC09829-ARW.jpg" alt="daniel zheng :O" width="390" height="260" style={{ marginTop: "45x" }}></img>
                    <Typography variant="h4" style={{ marginTop: "20px" }}>
                        Daniel Zheng
                    </Typography>
                    <Typography variant="subtitle" style={{ marginTop: "45x" }}>
                        League of Legends SUPERSTAR Jungler and Hacker Extraordinaire
                    </Typography>
                </Card>
            <IconButton variant="link" target="_blank" href = "https://www.facebook.com" size="large"><FacebookIcon/></IconButton>
            <IconButton variant="link" target="_blank" href = "https://www.linkedin.com" size="large"><LinkedInIcon/></IconButton>
            <IconButton variant="link" target="_blank" href = "https://www.twitter.com" size="large"><TwitterIcon/></IconButton>
            <IconButton variant="link" target="_blank" href = "https://www.instagram.com" size="large"><InstagramIcon/></IconButton>
            </Wrapper>
            <Footer />
        </div>
    );
};

export default Profile;