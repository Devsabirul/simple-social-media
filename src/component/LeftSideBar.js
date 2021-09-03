import { Container, makeStyles, Typography, Avatar, alpha } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    Bookmark,
    List,
    Home,
    PlayCircleOutline,
    Storefront,
} from "@material-ui/icons";
import './css/LeftSideBar.css'
import React, { useContext } from 'react'
import { authContext } from '../App';
const styles = makeStyles(theme => ({
    container: {
        marginTop: "5px",
        position: "fixed",
        width: "25%",
        [theme.breakpoints.down("sm")]: {
            width: "20%",
            position: " absolute",
            left: "-17px"
        },
    },
    item: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: "rgb(247, 247, 247)",
        },
        borderRadius: "12px"
    },
    InfoItem: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        borderRadius: "12px",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: "rgb(247, 247, 247)",
        },
    },
    img: {
        marginRight: "10px",
    },
    icon: {
        fontSize: "35px",
        marginRight: "10px",
        color: "#3F51B5"
    },
    text: {
        display: "block",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        fontWeight: "500",
    }
}))
const LeftSideBar = () => {
    const [user] = useContext(authContext)
    const { name, photo } = user;
    const classes = styles()
    return (
        <Container className={classes.container}>
            <div className="container">
                <div className={classes.InfoItem} >
                    <Avatar src={photo} className={classes.img} />
                    <Typography className={classes.text} > {name} </Typography>
                </div>
                <div className={classes.item} >
                    <Home className={classes.icon} />
                    <Typography className={classes.text} >Home</Typography>
                </div>
                <div className={classes.item} >
                    <PersonIcon className={classes.icon} />
                    <Typography className={classes.text} >Friends</Typography>
                </div>
                <div className={classes.item} >
                    <PeopleAltIcon className={classes.icon} />
                    <Typography className={classes.text} >Groups</Typography>
                </div><div className={classes.item}>
                    <List className={classes.icon} />
                    <Typography className={classes.text}>Lists</Typography>
                </div>
                <div className={classes.item}>
                    <PlayCircleOutline className={classes.icon} />
                    <Typography className={classes.text}>Videos</Typography>
                </div>
                <div className={classes.item}>
                    <Bookmark className={classes.icon} />
                    <Typography className={classes.text}>Collections</Typography>
                </div>
                <div className={classes.item}>
                    <Storefront className={classes.icon} />
                    <Typography className={classes.text}>Market Place</Typography>
                </div>
                <div className={classes.item}>
                    <ArrowDropDownIcon className={classes.icon} />
                    <Typography className={classes.text}>See More</Typography>
                </div>
            </div>
        </Container >
    )
}

export default LeftSideBar
