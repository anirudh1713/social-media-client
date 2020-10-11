import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const friendsLoad = (token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_FRIENDS_LOAD_START });
    axios.get('http://localhost:30001/friends', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_FRIENDS_LOAD_SUCCESS, friends: res.data.friends });
    }).catch(err => {
      dispatch({ type: actionTypes.ON_FRIENDS_LOAD_FAIL, error: err.response.data.error });
    });
  };
};

export const onSentRequestLoad = (token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_SENT_REQ_LOAD_START });
    axios.get('http://localhost:30001/friends/sent', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_SENT_REQ_LOAD_SUCCESS, sentRequests: res.data.sentRequest })
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_SENT_REQ_LOAD_FAIL, error: err.response.data.error });
    });
  };
};

export const onPendingRequestLoad = (token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_PENDING_REQ_LOAD_START });
    axios.get('http://localhost:30001/friends/pending', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_PENDING_REQ_LOAD_SUCCESS, pendingRequests: res.data.pendingRequests });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_PENDING_REQ_LOAD_FAIL, error: err.response.data.error });
    })
  }
}

export const onAddFriend = (token, userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_SEND_FRIEND_REQ_START });
    axios.post(`http://localhost:30001/friends/add/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_SEND_FRIEND_REQ_SUCCESS, sentRequest: res.data.request[0] });
    }).catch(err => {
      console.log(err);
      if (err.response.data.error){
        dispatch({ type: actionTypes.ON_SEND_FRIEND_REQ_FAIL, error: err.response.data.error });
      }else {
        dispatch({ type: actionTypes.ON_SEND_FRIEND_REQ_FAIL, error: err });
      }
    });
  };
};

export const onAcceptRequest = (token, requesterId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_FRIEND_REQ_ACCEPT_START });
    axios.post(`http://localhost:30001/friends/accept/${requesterId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_FRIEND_REQ_ACCEPT_SUCCESS, newFriend: res.data.result })
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_FRIEND_REQ_ACCEPT_FAIL, error: err.response.data.error });
    });
  };
};

export const onRejectRequest = (token, userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_FRIEND_REQ_REJECT_START });
    axios.post(`http://localhost:30001/friends/reject/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_FRIEND_REQ_REJECT_SUCCESS, userId });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_FRIEND_REQ_REJECT_FAIL, error: err.response.data.error });
    });
  }
}

export const onRemoveFriend = (token, userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_FRIEND_REMOVE_START });
    axios.post(`http://localhost:30001/friends/remove/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_FRIEND_REMOVE_SUCCESS, friendId: userId });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_FRIEND_REMOVE_FAIL, error: err.response.data.error });
    })
  }
};