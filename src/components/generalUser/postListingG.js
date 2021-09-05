import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {Link} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {formatDistance} from 'date-fns'
import AddToLibrary from "./addToLibraryG";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 320,
        height: 467,
        borderRadius: 5,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    authorInfo: {
        fontSize: 18,
        fontWeight: 550,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    summaryValues: {
        textAlign: "center",
    },
    title: {
        textAlign: "center",
        fontWeight: 600,
        height: 85,
        overflow: "hidden",
    },
    profilePic: {
        width: 50,
        height: 50,
        margin: "auto",

    },
}));


export default function PostListing({
                                        userID,
                                        postID,
                                        title,
                                        coverImage,
                                        author,
                                        authorPP,
                                        authorID,
                                        publishedData,
                                        likes,
                                        viewCount,
                                        readTime
                                    }) {

    const classes = useStyles();
    let likeCount = 0;
    likes.map(item => {
        likeCount++;
    })

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt="Profile image" className={classes.profilePic} src={authorPP}/>
                }
                title={
                    <span className={classes.authorInfo}>
                        <Link href={"/components/generalUser/userProfile/" + authorID}
                              style={{fontWeight: 600, textDecoration: "none"}}>{author}</Link>
                    </span>
                }
                subheader={formatDistance(new Date(publishedData), new Date(), {addSuffix: true})}
            />
            <CardMedia
                className={classes.media}
                image={coverImage}
            />
            <CardContent>
                <Typography variant="h4" color="" component="h4" className={classes.title}>
                    <Link href={'/components/generalUser/viewArticle/' + postID} style={{
                        fontWeight: 600,
                        textDecoration: "none",
                        height: 85,
                        overflow: "hidden"
                    }}>{title}</Link>

                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={3} className={classes.statSection}>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <ThumbUpAltIcon/> <br/>{likeCount} <br/>Likes
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <VisibilityIcon/> <br/>{viewCount} <br/>Views
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues} style={{paddingTop: 20}}>
                        {Math.ceil(readTime)} min Read
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <AddToLibrary postID={postID} userID={userID}/>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
