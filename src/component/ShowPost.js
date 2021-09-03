import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    makeStyles,
    Tooltip,
    Typography,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useContext, useState } from 'react'
import { authContext } from '../App';

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(5),
    },
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 150,
        },
    },
}));

const ShowPost = ({ img, title }) => {
    const classes = useStyles();
    const [user] = useContext(authContext)
    const { photo, name } = user;
    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={photo} className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader="September 14, 2016"
                />
                <Typography style={{ marginBottom: "10px", padding: "10px" }}>
                    {title}
                </Typography>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title="Paella dish"
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <Tooltip title="Like" placement="top">
                            <FavoriteIcon color="secondary" />
                        </Tooltip>
                    </IconButton>
                    <IconButton aria-label="share">
                        <Tooltip title="Comment" placement="top">
                            <ChatBubbleOutlineIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton aria-label="share">
                        <Tooltip title="Share" placement="top">
                            <ShareIcon />
                        </Tooltip>
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
};

export default ShowPost;
