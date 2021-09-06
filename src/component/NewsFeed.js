import { Container, makeStyles } from "@material-ui/core"
import CreatePost from "./CreatePost"
import ShowPost from "./ShowPost"
import StoryReel from "./StoryReel"
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
const NewsFeed = () => {
    const classes = styles()
    return (
        <Container className={classes.container} >
            <StoryReel />
            <div className={classes.gridContainer}>
                <CreatePost />
            </div>
            <ShowPost />
        </Container>
    )
}

export default NewsFeed
