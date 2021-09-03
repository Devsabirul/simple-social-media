import { Dialog, Button, Typography, Box, TextField, Checkbox, Snackbar } from '@material-ui/core'
import './css/login.css'
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import React, { useContext, useState } from 'react'
import { authContext, UserContext } from '../App';
import MuiAlert from '@material-ui/lab/Alert';
//firebase component
import { firebaseConfig } from './Config'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
const styles = makeStyles(theme => ({
    loginHeader: {
        fontSize: "60px",
        backgroundColor: "red",
        padding: "10px",
        borderRadius: "50px",
        color: "white",
    },
    loginBtn: {
        marginTop: "20px",
        padding: "10px",
    },
    dialogStyle: {
        width: "500px",
        [theme.breakpoints.down("sm")]: {
            width: "300px"
        },
    },
    mainDialog: {
        // backgroundColor: "red"
        backgroundImage: "url('https://www.incimages.com/uploaded_files/image/1920x1080/getty_522390562_274931.jpg')"
    }
}))
//Alert dialog

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const newUserInfo = { ...user }
        newUserInfo.success = false
        newUserInfo.error = false
        setUser(newUserInfo)
        setValidAlert(false)
    };
    // use context api 
    const [user, setUser] = useContext(authContext)
    const { name, email, password, success, error } = user;
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    // this is from this component 
    const [trams, setTrams] = useState(false)
    const classes = styles()
    const [validAlert, setValidAlert] = useState(false)
    //react router protected 
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [logInInfo, setLogInInfo] = useState(false)
    // firebase authentication
    const formSubmit = (e) => {
        if (!logInInfo && email && password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const { displayName, photoURL, email } = res.user
                    const newUserInfo = { ...user }
                    newUserInfo.error = false
                    newUserInfo.success = true
                    newUserInfo.name = displayName
                    newUserInfo.photo = photoURL
                    newUserInfo.email = email
                    setUser(newUserInfo)
                    updateUserName(name)
                })
                .catch((error) => {
                    // const isEmailError = true;
                    if (error) {
                        const newUserInfo = { ...user }
                        newUserInfo.error = true
                        newUserInfo.success = false
                        setUser(newUserInfo)
                    }
                });
        }
        if (logInInfo && email && password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const { displayName, photoURL, email } = res.user
                    const newUserInfo = { ...user }
                    // newUserInfo.error = false
                    // newUserInfo.success = true
                    newUserInfo.name = displayName
                    newUserInfo.photo = photoURL
                    newUserInfo.email = email
                    setUser(newUserInfo)
                    setLoggedIn(true)
                    history.replace(from);
                }).catch((error) => {
                    // const isEmailError = true;
                    if (error) {
                        const newUserInfo = { ...user }
                        // newUserInfo.error = true
                        // newUserInfo.success = false
                        setUser(newUserInfo)
                        console.log(error)
                    }
                });
        }
        e.preventDefault()
    }
    //UpdateUserName
    const updateUserName = name => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://scontent.fdac5-1.fna.fbcdn.net/v/t39.30808-6/207303532_1035177973954135_4850843630160789261_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PbQCVE4itv0AX-96ADa&_nc_ht=scontent.fdac5-1.fna&oh=bc1ede62ecb6a1f0afc0879e96b6c5e5&oe=6134F240"
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }
    // google authentication
    const provider = new GoogleAuthProvider();
    const googleAuthentication = (e) => {
        const googleAuth = getAuth();
        signInWithPopup(googleAuth, provider)
            .then(res => {
                // console.log(res)
                const { displayName, photoURL, email } = res.user
                const newUserInfo = { ...user }
                // newUserInfo.error = false
                // newUserInfo.success = true
                newUserInfo.name = displayName
                newUserInfo.photo = photoURL
                newUserInfo.email = email
                setUser(newUserInfo)
                setLoggedIn(true)
                history.replace(from);
            })
            .catch((error) => {
                // const isEmailError = true;
                if (error) {
                    const newUserInfo = { ...user }
                    newUserInfo.error = true
                    newUserInfo.success = false
                    setUser(newUserInfo)
                }
            });
    }
    // form validation 
    const getFiledData = (e) => {
        let isFormFiledValid = true
        if (e.target.name === "name") {
            isFormFiledValid = /[a-z]/.test(e.target.value)
        }
        if (e.target.name === "email") {
            isFormFiledValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === "password") {
            isFormFiledValid = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/.test(e.target.value)
        }
        if (isFormFiledValid) {
            const newUser = { ...user }
            newUser[e.target.name] = e.target.value
            setUser(newUser)
            setValidAlert(false)
        } else {
            setValidAlert(true)
        }
    }
    return (
        <>
            <Dialog open={true} className={classes.mainDialog} >
                <Box p={5} textAlign="center" className={classes.dialogStyle}>
                    <Typography style={{ marginTop: 10 }}>
                        <LockIcon className={classes.loginHeader} />
                    </Typography>
                    <Typography variant="h4" style={{ marginTop: 20 }}>
                        <h4>Hay , Welcome back!!!</h4>
                    </Typography>
                    <Button
                        className={classes.loginBtn}
                        onClick={googleAuthentication}
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        startIcon={<EmailIcon />}
                    >Continue with google</Button>
                    <Typography style={{ marginTop: 10 }}>
                        or
                    </Typography>
                    <form onSubmit={formSubmit}>
                        {
                            !logInInfo && <TextField
                                className="mt-2"
                                name="name"
                                required
                                label="Full Name"
                                placeholder="Enter your Full Name"
                                fullWidth
                                variant="filled"
                                color="secondary"
                                onBlur={getFiledData}
                            />
                        }
                        <TextField
                            className="mt-2"
                            name="email"
                            required
                            label="Email"
                            placeholder="Enter your Email address"
                            fullWidth
                            variant="filled"
                            color="secondary"
                            type="email"
                            onBlur={getFiledData}
                        />
                        <TextField
                            className="mt-2"
                            name="password"
                            required
                            label="Password"
                            placeholder="Enter your Password"
                            fullWidth
                            variant="filled"
                            color="secondary"
                            type="password"
                            onBlur={getFiledData}
                        />
                        {
                            !logInInfo && <Typography style={{ textAlign: 'left', marginLeft: "-10px" }}>
                                <Checkbox
                                    onClick={() => setTrams(!trams)}
                                />
                                <label>I agree all trams and conditions</label>
                            </Typography>
                        }
                        {
                            logInInfo ?
                                <Button
                                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                                    className={classes.loginBtn}
                                    color="primary"
                                    variant="outlined"
                                    type="submit"
                                >Log IN</Button> : <Typography
                                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setValidAlert(false)
                                        const newUserInfo = { ...user }
                                        newUserInfo.success = false
                                        setUser(newUserInfo)
                                        setLogInInfo(!logInInfo)
                                    }}
                                    color="primary"
                                    variant="outlined"
                                >Sign In</Typography>
                        }
                        {
                            logInInfo ? <Typography
                                style={{ paddingLeft: "20px", paddingRight: "20px", marginLeft: "20px" }}
                                className="btn btn-outline-secondary"
                                onClick={() => setLogInInfo(!logInInfo)}
                                color="primary"
                                variant="outlined"
                            >Sign Up</Typography> :
                                trams ? <Button
                                    style={{ paddingLeft: "20px", paddingRight: "20px", marginLeft: "20px" }}
                                    className={classes.loginBtn}
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                >Sign Up</Button> : <Button
                                    style={{ paddingLeft: "20px", paddingRight: "20px", marginLeft: "20px" }}
                                    className={classes.loginBtn}
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                    disabled
                                >Sign Up</Button>
                        }
                    </form>
                    {/* alert massage */}
                    <Snackbar open={error} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Alert onClose={handleClose} severity="error">
                            {validAlert ? "please enter a valid Info!" : "The Email Already Registered!"}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={success} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Alert onClose={handleClose} severity="success">
                            User Created Successfully!
                        </Alert>
                    </Snackbar>
                </Box>
            </Dialog>
        </>
    )
}

export default Login
