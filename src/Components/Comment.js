import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';

import { TextField, IconButton, makeStyles } from '@material-ui/core'
import { Send } from '@material-ui/icons';

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

  const [comment, setComment] = useState('');

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    props.onCommentAdd(props.token, comment, props.postId);
  };

  return (
    <form className={classes.commentContainer} onSubmit={onCommentSubmitHandler}>
      <div className={classes.commentInput}>
        <TextField label="Comment"
                   fullWidth
                   value={comment}
                   onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <IconButton type="submit" className={classes.commentPost}>
          <Send fontSize="inherit" />
        </IconButton>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCommentAdd: (token, description, postId) => dispatch(actions.addComment(token, description, postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);