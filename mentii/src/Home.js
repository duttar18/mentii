import React from "react";
import { Grid } from "@material-ui/core";
import Mentor from "./Mentor";
import Footer from "./Footer";

const Home = () => {
    return (
        <div>
            <Grid item container>
                <Grid xs={0} sm={2} />
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Mentor />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Mentor />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Mentor />
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
