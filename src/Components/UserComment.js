import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/index';

import { makeStyles, Avatar, Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';


/****************** CUSTOM CSS **********************/
const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  commentContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  contentContainer: {
    marginLeft: theme.spacing(2)
  },
  linkClass: {
    textDecoration: 'none'
  },
  deleteIcon: {
    marginLeft: 'auto'
  }
}));

const UserComment = (props) => {
  const classes = useStyles();

  const onDeleteCommentHandler = () => {
    props.onCommentDelete(props.token, props.commentId, props.postId);
  };

  return (
    <div className={classes.commentContainer}>
      <div>
        <Link to={`/user/${props.userId}`} className={classes.linkClass}>
          <Avatar className={classes.avatar}>{props.username}</Avatar>
        </Link>
      </div>
      <div className={classes.contentContainer}>
        <div>
          <Link to={`/user/${props.userId}`} className={classes.linkClass}>
            <Typography variant={'body2'} color={'textPrimary'} component={'strong'}>
              {props.username}
            </Typography>
          </Link>
        </div>
        <div>
          <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
            {props.comment}
          </Typography>
        </div>
      </div>
      {+props.userId === +props.currentUserId ?
        <div className={classes.deleteIcon}>
          <IconButton onClick={onDeleteCommentHandler}>
            <Delete/>
          </IconButton>
        </div> : null
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCommentDelete: (token, commentId, postId) => dispatch(actions.removeComment(token, commentId, postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComment);