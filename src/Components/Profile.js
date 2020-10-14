import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import moment from 'moment';

import {
  Grid, Avatar, Typography, makeStyles, LinearProgress, Button, IconButton, Badge
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import CreatePost from '../Containers/CreatePost/CreatePost';
import Post from "./Post";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  profileImage: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  profileContainer: {
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
  rootWithBottom: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  post: {
    margin: '20px 0'
  },
  input: {
    display: 'none'
  }
}));

const Profile = (props) => {
  const classes = useStyles();

  const [profielPic, setProfilePic] = useState(null);

  const profileUserId = props.match.params.id;
  const { profileLoad, token, history, profileLoadError } = props;

  useEffect(() => {
    if (!token || profileLoadError) {
      history.push('/signup');
    }
    profileLoad(profileUserId, token);
  }, [profileUserId, token, profileLoad, history, profileLoadError]);

  let content = (
    <div className={classes.root}>
      <LinearProgress color={"secondary"} />
    </div>
  );

  /*************** HANDLERS ************************/
  const onAcceptRequestHandler = () => {
    props.onAcceptRequest(token, profileUserId);
  };

  const onRejectRequestHandler = () => {
    props.onRejectRequest(token, profileUserId);
  };

  const addFriendHandler = () => {
    props.onAddFriend(token, profileUserId);
  };

  const onRemoveFriendHandler = () => {
    props.onRemoveFriend(token, profileUserId);
  };

  const fileChangeHandler = (e) => {
    e.preventDefault();
    setProfilePic(e.target.files[0]);
  };

  
  let dob = props.dob;
  dob = moment(dob).format("MMM Do YYYY");

  let postContent = null;
  let userPosts = null;
  if (props.posts) {
    userPosts = props.posts.filter(post => {
      return +profileUserId === +post.userUserId;
    });
  }
  if (userPosts && userPosts.length > 0) {
    postContent = userPosts.map(post => {
      let postDate = moment(post.createdAt).format("MMM Do YYYY");
      return (
        <Grid item xs={12} className={classes.post} key={post.post_id}>
          <Post username={props.username}
                postUserId={post.user.user_id}
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
      )
    });
  } else if (props.userId && profileUserId && +props.userId === +profileUserId) {
    postContent = (
      <Typography variant="h4" color="secondary" style={{ margin: "15px", fontWeight: "600", letterSpacing: "2px" }}>
        Add some posts!
      </Typography>
    );
  } else {
    postContent = (
      <Typography variant="h4" color="secondary" style={{ margin: "15px", fontWeight: "600", letterSpacing: "2px" }}>
        User has no posts!
      </Typography>
    );
  }

  let createPostContent = null;

  if (props.userId && profileUserId && +props.userId === +profileUserId) {
    createPostContent = (
      <Grid item xs={12}>
        <CreatePost />
      </Grid>
    );
  }

  /************ ADD FRIEND BUTTON ****************/
  let addFriendButton = (
    <Grid container item xs={12} justify={"space-between"} alignItems={"center"}>
      <Button fullWidth 
              color={"secondary"} 
              variant={"contained"}
              onClick={addFriendHandler}
              startIcon={<GroupAddIcon />}
      >
        Add Friend
      </Button> 
    </Grid>
  );

  if(props.sentRequests) {
    const sentOrNot = props.sentRequests.find(req => {
      return req.receiverUserId === +profileUserId;
    });
    if (sentOrNot) {
      addFriendButton = (
        <Grid container item xs={12} justify={"space-between"} alignItems={"center"}>
          <Button fullWidth 
                  color={"secondary"} 
                  variant={"contained"}
                  disabled
                  startIcon={<GroupAddIcon />}
          >
            Request Sent
          </Button>
        </Grid>
      );
    }
  }
  if(props.pendingRequests) {
    const pendingOrNot = props.pendingRequests.find(req => {
      return req.userUserId === +profileUserId;
    });
    if (pendingOrNot) {
      addFriendButton = (
        <Grid container item xs={12} direction={"row"} justify={"space-around"} alignItems={"center"}>
          <Grid item xs={6}>
            <Button fullWidth 
                  color={"primary"} 
                  variant={"contained"}
                  onClick={onAcceptRequestHandler}
                  startIcon={<GroupAddIcon />}
            >
              Accept
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth 
                  color={"secondary"}
                  onClick={onRejectRequestHandler} 
                  variant={"outlined"}
                  startIcon={<PersonAddDisabledIcon />}
            >
              Reject 
            </Button>
          </Grid>
        </Grid>
      )
    }
  }
  if (props.friends) {
    const friendsOrNot = props.friends.find(req => {
      return (req.userUserId === +profileUserId || req.receiverUserId === +profileUserId);
    });
    if (friendsOrNot) {
      addFriendButton = (
        <Grid container item xs={12} alignItems={"center"}>
          <Button fullWidth 
                  color={"secondary"} 
                  variant={"contained"}
                  onClick={onRemoveFriendHandler}
                  startIcon={<PersonAddDisabledIcon />}
          >
            Remove Friend
          </Button>
        </Grid>
      );
    }
  }

  if (!props.postLoading && !props.userLoading) {
    content = (
      <Grid container>
        <Grid item xs={3} />
        <Grid item 
              container 
              xs={6} 
              direction={"row"} 
              alignItems={"center"} 
              justify={"center"}
        >
          <Grid container 
                item xs={12} 
                direction={"row"} 
                alignItems={"center"} 
                justify={"center"}
                className={classes.rootWithBottom}
          >
            <Grid item xs={2} />
            <Grid item container xs={8} spacing={3} alignItems={"center"} justify={"center"}>
              <Grid item xs={12} sm={6}>
                <input accept="image/*"
                       className={classes.input}
                       id="contained-button-file"
                      //  disabled={props.profilePicLoading ? true : false}
                       onChange={fileChangeHandler}
                       type="file"
                />
                <label htmlFor="contained-button-file">
                  <IconButton>
                    <Avatar src={props.profilePhoto ? props.profilePhoto : null} 
                            className={classes.profileImage}
                    >
                      {props.username}
                    </Avatar>
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant={"h4"} component={"h4"}>{props.username}</Typography>
              </Grid>
              {props.userId && profileUserId && +props.userId === +profileUserId ? null :
                <>{addFriendButton}</>
              }
            </Grid>
            <Grid item xs={2} />
          </Grid>
          {createPostContent}
          {postContent}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }

  return (
    <>
      {props.token ? null : <Redirect to={'/signup'} />}
      {content}
    </>
  );
};

const mapStateToProps = state => {
  return {
    profileLoadError: state.profile.userError,
    userId: state.auth.userId,
    token: state.auth.token,
    username: state.profile.username,
    dob: state.profile.dob,
    gender: state.profile.gender,
    profilePhoto: state.profile.profilePhoto,
    posts: state.posts.posts,
    userLoading: state.profile.userLoading,
    postLoading: state.posts.loading,
    sentRequests: state.friends.sentRequests,
    friends: state.friends.friends,
    pendingRequests: state.friends.pendingRequests,
    friendsLoading: state.friends.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileLoad: (userId, token) => dispatch(actions.profileLoad(userId, token)),
    onAddFriend: (token, userId) => dispatch(actions.onAddFriend(token, userId)),
    onAcceptRequest: (token, requesterId) => dispatch(actions.onAcceptRequest(token, requesterId)),
    onRejectRequest: (token, userId) => dispatch(actions.onRejectRequest(token, userId)),
    onRemoveFriend: (token, userId) => dispatch(actions.onRemoveFriend(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);