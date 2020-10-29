import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, makeStyles, Typography } from "@material-ui/core";

import CreatePost from "../CreatePost/CreatePost";
import Post from '../../Components/Post';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';

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

  const [ hasMore, setHasMore ] = useState(true);

  const { onFetchPosts, token, error, page, limit } = props;

  //const limit = 5;
  //let offset = limit * page;

  useEffect(() => {
    onFetchPosts(token, limit, page);
  }, [onFetchPosts, token, page, limit]);

  useEffect(() => {
    if (error) {
      setHasMore(false);
    }
  }, [error]);

  //scroll loader
  const loading = (
    <CircularProgress />
  );

  //FOR LOADING
  let feedContent = (
    <div className={classes.rootLoading}>
      <LinearProgress color={"secondary"} />
    </div>
  );

  let allPosts = null;
  //CHANGE IF LOADED

  //post loading
  let postLoading = null;
  
  //&&!props.loading
  if (props.posts && props.posts.length > 0) {
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
      <>
        {postLoading}
        <Grid container className={classes.root}>
          <Grid item container xs={3} />
          <Grid item container xs={6} className={classes.createPost}>
            <Grid item xs={12}>
              <CreatePost />
            </Grid>
            <Grid item xs={12}>
              <InfiniteScroll dataLength={props.posts.length}
                              next={() => props.onPageInc()}
                              hasMore={hasMore}
                              loader={loading}
                              endMessage={
                                <p style={{ textAlign: 'center' }}>
                                  <b>You have seen it all</b>
                                </p>
                              }
                              style={{overflow: 'hidden'}}
              >
                {allPosts}
              </InfiniteScroll>
            </Grid>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </>
    );
  }else {
    // postLoading = (
    //   <LinearProgress />
    // );
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
    error: state.posts.postLoadError,
    limit: state.posts.limit,
    page: state.posts.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: (token, limit, offset) => dispatch(actions.postsLoad(token, limit, offset)),
    onPageInc: () => dispatch({ type: actionTypes.ON_PAGE_INC })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);