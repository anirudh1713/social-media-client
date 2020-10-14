import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import * as actionTypes from '../store/actions/actionTypes';

import { TextField, IconButton, makeStyles } from '@material-ui/core'
import { Send } from '@material-ui/icons';

import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

//material ui alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*************** CUSTOM CSS STYLES ***************/
const useStyles = makeStyles({
  commentContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  commentInput: {
    flex: 1
  },
  commentPost: {
    flex: 1
  }
});

const Comment = (props) => {
  const classes = useStyles();

  const [comment, setComment] = useState({ value: '', valid: true, changed: false });

  const { success } = props;

  useEffect(() => {
    if (success) {
      setComment({
        value: "",
        valid: true,
        changed: false
      })
    }
  }, [success]);

  const onCommentChangeHanndler = (e) => {
    setComment({
      value: e.target.value,
      valid: e.target.value.trim() !== "",
      changed: true
    });
  };

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    if (comment.value.trim() !== '') {
      props.onCommentAdd(props.token, comment.value, props.postId);
    }else {
      setComment({
        value: comment.value,
        valid: false,
        changed: true
      })
    }
  };

  const onSuccessCloseHandler = () => {
    props.onCommentSuccessClear();
  };

  const onErrorCloseHandler = () => {
    props.onCommentErrorClear();
  };

  return (
    <>
      {success &&
        <Snackbar open={success ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onSuccessCloseHandler}
        >
          <Alert onClose={onSuccessCloseHandler} severity={"success"}>
            {"Comment added!"}
          </Alert>
        </Snackbar>
      }
      {props.error &&
        <Snackbar open={props.error ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onErrorCloseHandler}
        >
          <Alert onClose={onErrorCloseHandler} severity={"error"}>
            {props.error}
          </Alert>
        </Snackbar>
      }
      <form className={classes.commentContainer} onSubmit={onCommentSubmitHandler}>
        <div className={classes.commentInput}>
          <TextField label="Comment"
                    fullWidth
                    value={comment.value}
                    error={!comment.valid}
                    helperText={!comment.valid && "please enter comment description"}
                    onChange={onCommentChangeHanndler}
          />
        </div>
        <div>
          <IconButton type="submit" className={classes.commentPost}>
            <Send fontSize="inherit" />
          </IconButton>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.posts.commentLoading,
    error: state.posts.commentError,
    success: state.posts.commentSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCommentAdd: (token, description, postId) => dispatch(actions.addComment(token, description, postId)),
    onCommentSuccessClear: () => dispatch({ type: actionTypes.ON_COMMENT_SUCCESS_CLEAR }),
    onCommentErrorClear: () => dispatch({ type: actionTypes.ON_COMMENT_ERROR_CLEAR })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);