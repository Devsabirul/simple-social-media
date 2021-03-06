import { Avatar, Box, Dialog, Typography, makeStyles, Select, MenuItem, Tooltip, Button, Container } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { db, firebaseConfig, storage } from './Config';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import React, { useContext, useState, useEffect } from 'react'
import { authContext, postContext } from '../App';

const styles = makeStyles(theme => ({
    container: {
        padding: "10px",
    },
    postContainer: {
        paddingTop: theme.spacing(5),
        cursor: "pointer"
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
    dialogStyle: {
        width: "500px",
        height: "63vh",
        [theme.breakpoints.down("sm")]: {
            width: "300px"
        },
    },
    header: {
        display: "flex",
        justifyContent: "center",
    },
    icon: {
        float: "left",
        marginRight: "10px,",
        position: "absolute",
        right: "0",
        padding: "10px",
        cursor: "pointer",

    },
    text: {
        padding: "10px",
        fontWeight: "bold",
        paddingTop: "10px",
    },
    info: {
        paddingLeft: "20px",
        display: "flex",
        // alignItems: "top",
    },
    infoText: {
        marginLeft: "10px",
        fontWeight: "bold",
    },
    dropdown: {
        position: "absolute",
        left: "70px",
        top: "105px",
    },
    selectAudience: {
        display: "flex",
        alignItems: "center",
    },
    selectAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    selectText: {
        marginLeft: "5px",
        fontWeight: "bold",
    },
    input: {
        outline: "none",
        border: "none",
        width: "100%",
        padding: "15px",
    },
    gridContainer: {
        margin: theme.spacing(2),
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px 0px rgb(235, 235, 235)",
        display: "flex",
        alignItems: "center",
    },
    btnContainer: {
        padding: "10px",
    },
    alertPostText: {
        fontWeight: "bold",
        cursor: "pointer",
        display: "block",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
    },
    alertPostIcon: {
        position: "absolute",
        right: "25px",
    },
    tagIcon: {
        marginRight: theme.spacing(1),
        cursor: "pointer",
    }
}))
const CreatePost = () => {
    const [user] = useContext(authContext)
    const { photo, name } = user;
    const classes = styles()
    //For Post 
    const [posts, setPosts] = useContext(postContext)
    console.log(posts)
    const [postImg, setPostImg] = useState("");
    const [caption, setCaption] = useState("");
    //Others Code
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState("")
    const setValueHandler = (event) => {
        setSelected(event.target.value);
    }
    //firebase Storages and database
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, []);
    //for upload image
    const uploadFileWithClick = (e) => {
        document.getElementById("imageUpload").click();
    }
    const getValueDAta = (e) => {
        if (e.target.files[0]) {
            setPostImg(e.target.files[0])
        }
    }
    const sendPostHandler = (e) => {
        if (postImg === "") {
            db.collection('posts').add({
                timestamp: new Date(),
                photoURL: photo,
                title: caption,
                username: name
            })
        }
        else {
            storage.ref("image").child(postImg.name).getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        timestamp: new Date(),
                        photoURL: photo,
                        title: caption,
                        username: name,
                        image: url
                    })
                })
        }
        e.preventDefault();
        setOpen(true);
    }
    return (
        <>
            <div className={classes.container} >
                <Dialog open={!open} onClose={open}>
                    <Box className={classes.dialogStyle} >
                        <div className="post-container">
                            <div className={classes.header}>
                                <div>
                                    <Typography variant="h5" className={classes.text}>
                                        Create Post
                                    </Typography>
                                </div>
                                <div className={classes.icon} onClick={() => setOpen(!open)}>
                                    <Tooltip title="Close" placement="left">
                                        <HighlightOffIcon color="secondary" fontSize="large" />
                                    </Tooltip>
                                </div>
                            </div>
                            <hr />
                            <div className={classes.info}>
                                <Avatar src={photo} className={classes.infoAvatar} />
                                <Typography className={classes.infoText}>
                                    {name}
                                </Typography>
                                <Typography className={classes.dropdown}>
                                    <Select value={selected} displayEmpty onChange={setValueHandler} >
                                        <MenuItem value="">
                                            <div className={classes.selectAudience}>
                                                <Avatar src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DUALS4Lkc8_.png" className={classes.selectAvatar} />
                                                <Typography className={classes.selectText}>
                                                    Public
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                        <MenuItem value={2}>
                                            <div className={classes.selectAudience}>
                                                <Avatar src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/1kWfMaRaG0b.png" className={classes.selectAvatar} />
                                                <Typography className={classes.selectText}>
                                                    Friends
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                        <MenuItem value={3}>
                                            <div className={classes.selectAudience}>
                                                <Avatar src="https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/s8kcB7Y_hmS.png" className={classes.selectAvatar} />
                                                <Typography className={classes.selectText}>
                                                    Only me
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                    </Select>
                                </Typography>
                            </div>
                            <div className={classes.textField}>
                                <textarea rows="5"
                                    required
                                    className={classes.input}
                                    onBlur={(e) => { setCaption(e.target.value) }}
                                    placeholder={`What,s on your mind, ${name}?`}
                                />
                                <div className={classes.gridContainer} >
                                    <div className={classes.alertPostText}>
                                        Add to yor post
                                    </div>
                                    <div className={classes.alertPostIcon}>
                                        <PersonAddIcon fontSize="large" color="primary" className={classes.tagIcon} />
                                        <PhotoLibraryIcon onClick={uploadFileWithClick} style={{ color: "red" }} fontSize="large" color="primary" className={classes.tagIcon} />
                                        <input onChange={getValueDAta} type="file" id="imageUpload" style={{ display: "none" }} />
                                        <InsertEmoticonIcon style={{ color: "#0ec52d" }} fontSize="large" color="primary" className={classes.tagIcon} />
                                        <LocationOnIcon fontSize="large" color="secondary" className={classes.tagIcon} />
                                        <MoreVertIcon fontSize="large" color="primary" className={classes.tagIcon} />
                                    </div>
                                </div>
                                <div className={classes.btnContainer} >
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        style={{ padding: "10px" }}
                                        onClick={sendPostHandler}
                                    >Post</Button>
                                </div>
                                {
                                    postImg !== "" && <p style={{ color: "green", textAlign: "center" }}> Image Added </p>
                                }
                            </div>
                        </div>
                    </Box>
                </Dialog>
                <div className={classes.avatar}>
                    <Avatar src={photo} className={classes.avatar} />
                </div>
                <div className={classes.button}>
                    <Typography className={classes.postBtn} onClick={() => setOpen(!open)}>
                        What's on your mind, {name}?
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default CreatePost
