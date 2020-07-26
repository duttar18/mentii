import React from "react";
import { Card, Avatar, Button } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import Content from "./Content";

const Mentor = (props) => {
    const { title, description, imgSrc } = props;
    return (
        <div>
            <Card style={{ marginTop: "100px" }}>
                <CardActionArea>
                    <CardMedia
                        style={{ height: "150px" }}
                        image={imgSrc}
                        title="streamer"
                    />
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" color="secondary">
                        {title}
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Mentor;
