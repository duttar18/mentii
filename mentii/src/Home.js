import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Mentor from "./Mentor";
import Footer from "./Footer";
import PrimarySearchAppBar from "./Appbar";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streams: [],
        };
    }
    componentDidMount() {
        fetch("/api/streams", {
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
    render() {
        return (
            <div>
                <PrimarySearchAppBar></PrimarySearchAppBar>
                <Grid item container>
                    <Grid xs={0} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6" style={{ marginTop: "50px" }}>
                            Advisors
                        </Typography>
                        <Grid container spacing={4}>
                            {this.state.streams.map((streamer) => (
                                <Grid item xs={12} sm={4}>
                                    <Mentor
                                        name={streamer.name}
                                        link={"/Watch/" + streamer.username}
                                        imgSrc={streamer.avatar}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={0} sm={2} />
                <Footer />
            </div>
        );
    }
}

export default Home;
