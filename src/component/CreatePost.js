import { Avatar, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { authContext } from '../App';
const styles = makeStyles(theme => ({
    container: {
        padding: "10px",
    },
    avatar: {
        marginRight: "10px",
        cursor: "pointer",
        float: "left",
    },
    button: {
        cursor: "pointer",
    },
    postBtn: {
        borderRadius: "12px",
        backgroundColor: "rgb(247, 247, 247)",
        padding: "8px",
        marginLeft: "10px",
    },
    icon: {
        float: "left",
        marginRight: "10px,"
    }
}))
const CreatePost = () => {
    const [user] = useContext(authContext)
    const { photo, name } = user;
    const classes = styles()
    const [open, setOpen] = useState(false)
    console.log(open)
    return (
        <div className={classes.container} >
            <div className={classes.avatar}>
                <Avatar src={photo} className={classes.avatar} />
            </div>
            <div className={classes.button}>
                <Typography className={classes.postBtn} onClick={() => setOpen(true)}>
                    What's on your mind, {name}?
                </Typography>
            </div>
        </div>
    )
}

export default CreatePost
