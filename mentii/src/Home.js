import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Mentor from "./Mentor";
import Footer from "./Footer";
import PrimarySearchAppBar from "./Appbar";
const Home = () => {
    return (
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <Grid item container>
                <Grid xs={0} sm={2} />
                <Grid item xs={12} sm={8}>
                    <Typography variant="h6" style={{ marginTop: "100px" }}> Computer Programmers</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Mentor
                                title="Daniel Zheng"
                                imgSrc="https://i.postimg.cc/Qxt1VSSb/DSC09829-ARW.jpg"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Mentor
                                title="Raul Dutta"
                                imgSrc="https://i.postimg.cc/kMjtrK9t/raul.jpg"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Mentor
                                title="James Li"
                                imgSrc="https://i.postimg.cc/SN32R4nS/james.jpg"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={2} />
            </Grid>

            <Footer />
        </div>
    );
};

export default Home;
