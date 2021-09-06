import React, { useContext, useState } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Container, Avatar, Button } from '@material-ui/core'
import { alpha, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import '../App.css'
import SearchIcon from '@material-ui/icons/Search'
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import { UserContext, authContext } from '../App'
import { useHistory } from "react-router-dom";

const styles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        cursor: "pointer"
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
        cursor: "pointer",
        [theme.breakpoints.down("sm")]:{
            textAlign: "center"
        },
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        width: "50%",
        padding: "5px",
        [theme.breakpoints.down("sm")]: {
            display: (props) => props.searchOpen ? "flex" : "none",
        },
    },
    input: {
        color: "white",
        marginLeft: theme.spacing(2)
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
    },
    searchIcon: {
        // marginLeft: theme.spacing(2),
        cursor: "pointer",
    },
    Icons: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            display: (props) => props.searchOpen ? "none" : "flex",
        }
    },
    badge: {
        marginRight: theme.spacing(4),
        cursor: "pointer",
    },
    searchBtn: {
        cursor: "pointer",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
        backgroundColor: theme.palette.text.disabled,
        padding: "5px",
        borderRadius: "50px",
    },
}))
const Header = () => {
    const history = useHistory()
    const [user] = useContext(authContext)
    const [searchOpen, setSearchOpen] = useState(false)
    const [loggedIn] = useContext(UserContext)
    const classes = styles({ searchOpen });
    console.log(user.photo)
    return (
        <AppBar position="sticky">
            <Container maxWidth="">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" className={classes.logoLg} >
                        FRIENDS ZOON
                    </Typography>
                    <Typography variant="h5" className={classes.logoSm} >
                        FD ZOON
                    </Typography>
                    <div className={classes.search} >
                        <SearchIcon className={classes.searchIcon} fontSize="large" onClick={() => setSearchOpen(false)} />
                        <InputBase
                            className={classes.input}
                            placeholder="Search....."
                        />
                    </div>
                    <div className={classes.userInfo}>
                        {
                            loggedIn ? <>
                                <div className={classes.Icons}>
                                    <SearchIcon fontSize="large" className={classes.searchBtn} onClick={() => setSearchOpen(true)} />
                                    <Badge badgeContent={4} className={classes.badge} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                    <Badge badgeContent={4} className={classes.badge} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                    <Badge style={{ cursor: "pointer", marginRight: "10px" }} color="secondary">
                                        <AppsIcon fontSize="large" />
                                    </Badge>
                                </div>
                                <div className={classes.userProfile}>
                                    <Avatar alt={user.photo} src={user.photo} style={{ cursor: "pointer" }} />
                                </div>
                            </> :
                                <Button
                                    color="inherit"
                                    onClick={(e) => {
                                        history.push("/");
                                        e.preventDefault()
                                    }}>Login</Button>
                        }
                    </div>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Header
