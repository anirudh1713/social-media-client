import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';

import { Grid, makeStyles, LinearProgress, Typography } from "@material-ui/core";

import CreatePost from "../CreatePost/CreatePost";
import Post from '../../Components/Post';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  createPost: {
    margin: '30px 0'
  },
  rootLoading: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
  post: {
    margin: '20px 0'
  }
}));

const Feed = (props) => {
  const classes = useStyles();

  //FOR LOADING
  let feedContent = (
    <div className={classes.rootLoading}>
      <LinearProgress color={"secondary"} />
    </div>
  );

  let allPosts = null;
  //CHANGE IF LOADED
  
  if (props.posts &&!props.loading && props.posts.length > 0) {
    //ALL POSTS RENDER
    allPosts = props.posts.map(post => {
      let postDate = moment(post.createdAt).format("MMM Do YYYY");
      return (
        <Grid item xs={12} className={classes.post} key={post.post_id}>
          <Post username={post.user.username}
                postUserId={post.user.user_id}
                userProfilePhoto={post.user.profile_photo}
                title={post.title}
                postDate={postDate}
                imageURL={post.picture}
                description={post.description}
                likes={post.likes.length}
                dislikes={post.dislikes.length}
                comments={post.comments.length}
                token={props.token}
                postId={post.post_id}
          />
        </Grid>
      );
    });

    //RENDER MAIN FEED CONTENT
    feedContent = (
      <Grid container className={classes.root}>
        <Grid item container xs={3} />
        <Grid item container xs={6} className={classes.createPost}>
          <Grid item xs={12}>
            <CreatePost />
          </Grid>
          {allPosts}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }else {
    feedContent = (
      <Grid container className={classes.root}>
        <Grid item container xs={3} />
        <Grid item container xs={6} className={classes.createPost}>
          <Grid item xs={12}>
            <CreatePost />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h6"} color={"inherit"}>
              opps...There are no posts!
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.createPost} />
      </Grid>
    );
  }

  return (
    feedContent
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    posts: state.posts.posts,
    loading: state.posts.loading,
    error: state.posts.error
  }
};

export default connect(mapStateToProps)(Feed);