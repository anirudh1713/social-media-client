import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Comment from './Comment';
import * as actions from '../store/actions/index';
import UserComment from './UserComment';

import { Card, CardHeader, Avatar, CardMedia, 
        CardContent, Typography, CardActions, 
        makeStyles, IconButton, Button } 
from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import { Delete } from '@material-ui/icons';

//MATERIAL UI CUSTOM STYLES
const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  linkClass: {
    textDecoration: 'none',
    color: 'inherit',
    '&:link': {
      textDecoration: 'none',
      color: 'inherit'
    },
    '&:active': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  likes: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});


const Post = (props) => {
  const classes = useStyles();

  const [showComments, setShowComments] = useState(false);

  //LIKE AND DISLIKE BUTTON COLOR CHANGE
  const thisPost = props.posts.find(post => {
    return post.post_id === props.postId;
  });
  let like = 'inherit';
  let dislike = 'inherit';
  if (thisPost.likes.includes(+props.userId)) {
    like = "primary";
    dislike = "inherit";
  }else if (thisPost.dislikes.includes(+props.userId)) {
    like = "inherit";
    dislike = "primary";
  }

  //LIKE POST
  const onPostLikeHandler = () => {
    props.onLikePost(props.token, props.postId);
  };

  //DISLIKE POST
  const onPostDislikeHandler = () => {
    props.onDislikePost(props.token, props.postId);
  };

  //DELETE POST
  const postDeleteHandler = () => {
    props.onDeletePost(props.token, props.postId);
  };

  //POST OPTION - DELETE - ICON
  let options = null;
  if (+props.userId === +props.postUserId) {
    options = (
      <IconButton aria-label="delete" onClick={postDeleteHandler}>
        <Delete color="error" />
      </IconButton>
    );
  }

  //COMMENTS
  let commentsData = null;
  if (showComments) {
    if (thisPost.comments.length <= 0) {
      commentsData = (
        <Typography variant={"h6"}>
          Its Empty!
        </Typography>
      );
    }else {
      commentsData = thisPost.comments.map(comment => {
        return (
          <div key={comment.comment_id}>
            <UserComment 
                         userId={comment.user.user_id} 
                         username={comment.user.username}
                         comment={comment.description}
                         commentId={comment.comment_id}
                         postId={props.postId}
            />
          </div>
        );
      });
    }
  }

  const onShowCommentsHandler = () => {
    setShowComments(prevState => {
      return !prevState;
    });
  }

  return (
    <Card>
      <div className={classes.postHeader}>
        <Link to={`/user/${props.postUserId}`} className={classes.linkClass}>
          <CardHeader avatar={<Avatar src={props.userProfilePhoto}>{props.username}</Avatar>}
                      title={props.username}
                      subheader={props.postDate}
          />
        </Link>
        {options}
      </div>
      { props.imageURL ?
        <CardMedia className={classes.media}
                 image={props.imageURL}
        /> : null
      } 
      <CardContent>
        <Typography variant="body1" color="textPrimary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.likes}>
          <IconButton aria-label="like" onClick={onPostLikeHandler}>
            <ThumbUpIcon color={like} />  
          </IconButton>
          <Typography variant="body2">{props.likes}</Typography>
        </div>
        <div className={classes.likes} onClick={onPostDislikeHandler}>
          <IconButton aria-label="dislike">
            <ThumbDownIcon color={dislike} />
          </IconButton>
          <Typography variant="body2">{props.dislikes}</Typography>
        </div>
        <div className={classes.likes}>
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2">{props.comments}</Typography>
        </div>
      </CardActions>
      <CardContent>
        <Comment postId={props.postId} />
      </CardContent>
      <CardContent>
        <Button onClick={onShowCommentsHandler}>{showComments ? 'HIDE COMMENTS' : 'SHOW COMMENTS'}</Button>
        {commentsData}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    posts: state.posts.posts,
    profilePhoto: state.profile.profilePhoto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLikePost: (token, postId) => dispatch(actions.likePost(token, postId)),
    onDislikePost: (token, postId) => dispatch(actions.dislikePost(token, postId)),
    onDeletePost: (token, postId) => dispatch(actions.deletePost(token, postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);