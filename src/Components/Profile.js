import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import moment from 'moment';
import * as actionTypes from '../store/actions/actionTypes';

import {
  Grid, Avatar, Typography, makeStyles, LinearProgress, Button, IconButton, Tabs, Tab
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

import CreatePost from '../Containers/CreatePost/CreatePost';
import Post from "./Post";
import { Redirect } from "react-router-dom";
import About from "./About";
import UserDataUpdate from "./UserDataUpdate";
import ChangePassword from "./ChangePassword";

//material ui alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  const [value, setValue] = useState(0);

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
    let formData = new FormData();
    formData.append('profileImage', e.target.files[0]);
    props.onProfilePhotoChange(formData, token);
  };

  const handleTabChange = (e, value) => {
    setValue(value);
  }

  //about data (DOB AND GENDER)
  let dob = props.dob;
  dob = moment(dob).format("MMM Do YYYY");

  let gender = '';
  if(props.gender === 'M') {
    gender = 'Male';
  }else if (props.gender === 'F') {
    gender = 'Female';
  }else {
    gender = 'Other';
  }
  
  //post contents
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
                userProfilePhoto={props.profilePhoto}
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

  //create post and Avatar contents & update data
  let createPostContent = null;
  let avatarContent = (
    <Avatar src={props.profilePhoto ? props.profilePhoto : null} 
                    className={classes.profileImage}
    >
      {props.username}
    </Avatar>
  );
  let changeDetailsContent = null;

  //if users is the signedin user
  if (props.userId && profileUserId && +props.userId === +profileUserId) {
    createPostContent = (
      <Grid item xs={12}>
        <CreatePost />
      </Grid>
    );
    avatarContent = (
      <>
        <input accept="image/*"
                      onChange={fileChangeHandler} 
                      className={classes.input} 
                      id="icon-button-file" 
                      type="file" 
              />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <Avatar src={props.profilePhoto ? props.profilePhoto : null} 
                    className={classes.profileImage}
            >
              {props.username}
            </Avatar>
          </IconButton>
        </label>
      </>
    );
    changeDetailsContent = (
      <>
        <Grid item xs={6} style={{ marginTop: '10px' }}>
          <UserDataUpdate username={props.username}
                          dob={props.dob}
                          gender={props.gender}
                          email={props.email}
                          token={token}
                          onUpdateData={props.onUpdateData}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop: '10px'}}>
          <ChangePassword onUpdatePassword={props.onUpdatePassword}
                          token={token}
          />
        </Grid>
      </>
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
          <Grid item xs={12}>
            <Button fullWidth 
                  color={"primary"} 
                  variant={"contained"}
                  onClick={onAcceptRequestHandler}
                  startIcon={<GroupAddIcon />}
            >
              Accept
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
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

  if (!props.postLoading && !props.userLoading && !props.friendsLoading) {
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
                item 
                xs={12} 
                direction={"column"} 
                alignItems={"center"} 
                justify={"center"}
                className={classes.rootWithBottom}
          >
            <Grid item xs={12}>
              {avatarContent}
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h4"} component={"h4"}>{props.username}</Typography>
            </Grid>
            {props.userId && profileUserId && +props.userId === +profileUserId ? null :
              <>{addFriendButton}</>
            }
          </Grid>
          <Tabs value={value}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
          >
            <Tab label="Posts" />
            <Tab label="About" />
          </Tabs>
          {value === 0 &&
            <>
              {createPostContent}
              {postContent}
            </>
          }
          {value === 1 &&
            <>
              <About data={[
                { name: 'Username', value: `${props.username}` },
                { name: 'Birthday', value: `${dob}` },
                { name: 'Gender', value: `${gender}` },
                { name: 'Email', value: `${props.email}` }
              ]} />
              <Grid xs={12} item container spacing={3} direction="row" justify="center" alignItems="center">
                {changeDetailsContent}
              </Grid>
            </>
          }
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }

  /*************** SnackBar Close *******************/
  const onErrorCloseHandler = () => {
    props.onProfilePhotoErrorClear();
    
  };

  const onSuccessCloseHandler = () => {
    props.onProfilePhotoSuccessClear();
  }

  return (
    <>
      {props.token ? null : <Redirect to={'/signup'} />}
      {props.profilePhotoError ?
        <Snackbar open={props.profilePhotoError ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onErrorCloseHandler}
        >
          <Alert onClose={onErrorCloseHandler} severity={"error"}>
            {props.profilePhotoError}
          </Alert>
        </Snackbar> : null
      } 
      {props.profilePhotoSuccess ?
        <Snackbar open={props.profilePhotoSuccess ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onSuccessCloseHandler}
        >
          <Alert onClose={onSuccessCloseHandler} severity={"success"}>
            {"Profile photo added."}
          </Alert>
        </Snackbar> : null
      }
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
    postLoading: state.posts.postLoadLoading,
    sentRequests: state.friends.sentRequests,
    friends: state.friends.friends,
    pendingRequests: state.friends.pendingRequests,
    friendsLoading: state.friends.loading,
    email: state.profile.email,
    profilePhotoSuccess: state.profile.profilePhotoSuccess,
    profilePhotoError: state.profile.profilePhotoError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileLoad: (userId, token) => dispatch(actions.profileLoad(userId, token)),
    onAddFriend: (token, userId) => dispatch(actions.onAddFriend(token, userId)),
    onAcceptRequest: (token, requesterId) => dispatch(actions.onAcceptRequest(token, requesterId)),
    onRejectRequest: (token, userId) => dispatch(actions.onRejectRequest(token, userId)),
    onRemoveFriend: (token, userId) => dispatch(actions.onRemoveFriend(token, userId)),
    onProfilePhotoChange: (profilePhoto, token) => dispatch(actions.addProfileImage(profilePhoto, token)),
    onUpdateData: (data, token) => dispatch(actions.updateUserData(data, token)),
    onUpdatePassword: (oldPass, newPass, token) => dispatch(actions.changePassword(oldPass, newPass, token)),
    onProfilePhotoSuccessClear: () => dispatch({ type: actionTypes.ON_ADD_PROFILE_IMAGE_SUCCESS_CLEAR }),
    onProfilePhotoErrorClear: () => dispatch({ type: actionTypes.ON_ADD_PROFILE_IMAGE_ERROR_CLEAR })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);