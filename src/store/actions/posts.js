import * as actionTypes from './actionTypes';
import axios from 'axios';

/*****************LOAD POST***************************/
export const postsLoad = (token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_POST_LOAD_START });
    axios.get(`http://localhost:30001/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch({
        type: actionTypes.ON_POST_LOAD_SUCCESS,
        posts: res.data.posts
      });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_POST_LOAD_FAIL, error: err });
    });
  };
};

/*****************ADD POST***************************/
export const addPost = (token, formData) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_ADD_POST_START });
    axios.post('http://localhost:30001/post', formData, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_ADD_POST_SUCCESS, post: res.data });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_ADD_POST_FAIL, error: err.response.data.error });
    });
  };
};

/*****************LIKE POST***************************/
export const likePost = (token, postId) => {
  return dispatch => {
    axios.post(`http://localhost:30001/post/like/${postId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch({ type: actionTypes.ON_LIKE_SUCCESS, postId, post: res.data.post });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_LIKE_FAIL, error: err.response.data.error });
    });
  };
};

/*****************DISLIKE POST***************************/
export const dislikePost = (token, postId) => {
  return dispatch => {
    axios.post(`http://localhost:30001/post/dislike/${postId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch({ type: actionTypes.ON_DISLIKE_SUCCESS, postId, post: res.data.post });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_DISLIKE_FAIL, error: err.response.data.error });
    });
  };
};

/*****************DELETE POST***************************/
export const deletePost = (token, postId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_DELETE_POST_START });
    axios.delete(`http://localhost:30001/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_DELETE_POST_SUCCESS, postId });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_DELETE_POST_FAIL, error: err.response.data.error });
    })
  };
};

/****************** ADD COMMENT **************************/
export const addComment = (token, description, postId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_COMMENT_START });
    axios.post(`http://localhost:30001/comment/${postId}`, {
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch({ type: actionTypes.ON_COMMENT_SUCCESS, comment: res.data.comment, postId });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_COMMENT_FAIL, error: err.response.data.error });
    });
  };
};

/******************* REMOVE COMMENT **********************/
export const removeComment = (token, commentId, postId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_COMMENT_DELETE_START });
    axios.delete(`http://localhost:30001/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_COMMENT_DELETE_SUCCESS, commentId, postId });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_COMMENT_DELETE_FAIL, error: err });
    })
  }
};