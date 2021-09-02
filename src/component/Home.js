import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import LeftSideBar from './LeftSideBar'
import NewsFeed from './NewsFeed'
import RightSideBar from './RightSideBar'
const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    hidden: {
        display: 'block',
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    }
}))

function Home() {
    const classes = styles()
    return (
        <>
            <Grid container spacing={3}>
                <Grid item className={classes.hidden} xs={2} sm={2} md={3} lg={3}>
                    <LeftSideBar />
                    {/* <Paper className={classes.paper}>xs=6</Paper> */}
                </Grid>
                <Grid item xs={12} sm={7} md={6} lg={5}>
                    <NewsFeed />
                </Grid>
                <Grid item className={classes.hidden} sm={3} md={3} lg={4}>
                    <RightSideBar />
                </Grid>
            </Grid>
        </>
    )
}

export default Home
