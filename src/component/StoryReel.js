import { Avatar, Grid, makeStyles } from '@material-ui/core'
import './css/newsfeed.css'
import React, { useContext } from 'react'
import { authContext } from '../App';
const styles = makeStyles(theme => ({
    container: {

    },
    gridContainer: {
        marginTop: theme.spacing(2),
        padding: "2px",
        borderRadius: "12px",
        boxShadow: "0px 0px 5px 0px rgb(235, 235, 235)"
    },
    avatar: {
        border: "3px solid rgb(209, 0, 0)",
    },
}))
const StoryReel = () => {
    const [user] = useContext(authContext)
    const { photo } = user;
    const classes = styles()
    return (
        <>
            <Grid container spacing={2} className={classes.gridContainer} >
                <Grid item xs={3} sm={3} md={3} lg={3} >
                    <div className="stroy-container" style={{ backgroundImage: `url('${photo}')` }}>
                        <div className="header">
                            <Avatar src={photo} className={classes.avatar} />
                        </div>
                        <div className="story-footer">
                            <p> Create Story </p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} >
                    <div className="stroy-container" style={{ backgroundImage: `url('https://ix-www.imgix.net/hp/snowshoe.jpg?q=70&w=1800&auto=compress%2Cenhance&fm=jpeg')` }}>
                        <div className="header">
                            <Avatar src="https://scontent.fdac5-2.fna.fbcdn.net/v/t1.6435-9/93140479_1495870187228737_3512608702039326720_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=kI6nfJ7uLpIAX-Rg8Wn&_nc_ht=scontent.fdac5-2.fna&oh=0e64c6f79d6ad5013aa5a1c9d87b8391&oe=6157B880" className={classes.avatar} />
                        </div>
                        <div className="footer">
                            <p>Shagor Ahmmed</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} >
                    <div className="stroy-container" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMccyhgBx7sSi0B8rx5YSSvwAeek5EqM53jBxzCjBuAz8Bnm5VHpL_0tc9W5iNzlmAkv4&usqp=CAU')` }} >
                        <div className="header">
                            <Avatar className={classes.avatar} src="https://scontent.fdac5-2.fna.fbcdn.net/v/t1.6435-9/186558537_521701622348094_442703724679174368_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rmH-W37RyhMAX8qtpO8&_nc_ht=scontent.fdac5-2.fna&oh=dfd051cd2dd279fb4484a452a0b428f9&oe=615796F5" />
                        </div>
                        <div className="footer">
                            <p>Nazmul Hasan</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} >
                    <div className="stroy-container" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1615966650071-855b15f29ad1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cGxlJTIwaW4lMjBsb3ZlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')` }}>
                        <div className="header">
                            <Avatar src="https://scontent.fdac5-2.fna.fbcdn.net/v/t1.6435-9/234214343_358641232470381_7649532869040618968_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aCVocr0zhykAX8qQGwG&_nc_ht=scontent.fdac5-2.fna&oh=add2553f63412bc752b7c67591d547bb&oe=6157DE5B" className={classes.avatar} />
                        </div>
                        <div className="footer">
                            <p>Yeashin Rana</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default StoryReel;
