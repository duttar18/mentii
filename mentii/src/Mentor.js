import React from "react";
import { Card, Avatar, Button } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import Content from "./Content";

const Mentor = () => {
    return (
        <div>
            <Card style={{ marginTop: "100px" }}>
                <CardActionArea>
                    <CardMedia
                        style={{ height: "100px" }}
                        image="/static/images/cards.jpg"
                        title="streamer"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Streamer 1
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" color="secondary">
                        Watch Stream
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Mentor;
