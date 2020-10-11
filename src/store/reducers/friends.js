import { friendsLoad } from '../actions';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  friends: null,
  pendingRequests: null,
  sentRequests: null,
  loading: false,
  error: null
};

const updatedArr = (arr) => {
  return arr.map(item => {
    return item;
  });
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ON_FRIENDS_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_FRIENDS_LOAD_SUCCESS:
      return {
        ...state,
        friends: action.friends,
        loading: false,
        error: null
      }
    case actionTypes.ON_FRIENDS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.ON_PENDING_REQ_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_PENDING_REQ_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingRequests: action.pendingRequests,
        error: null
      }
    case actionTypes.ON_PENDING_REQ_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.ON_SENT_REQ_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_SENT_REQ_LOAD_SUCCESS:
      return {
        ...state,
        sentRequests: action.sentRequests,
        loading: false,
        error: null
      }
    case actionTypes.ON_SENT_REQ_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.ON_SEND_FRIEND_REQ_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_SEND_FRIEND_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sentRequests: [...state.sentRequests, action.sentRequest]
      }
    case actionTypes.ON_SEND_FRIEND_REQ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.ON_FRIEND_REQ_ACCEPT_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_FRIEND_REQ_ACCEPT_SUCCESS:
      return {
        ...state,
        friends: [...state.friends, action.newFriend],
        pendingRequests: state.pendingRequests.filter(req => {
          return req.userUserId !== action.newFriend.userUserId;
        }),
        error: null
      }
    case actionTypes.ON_FRIEND_REQ_ACCEPT_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.ON_FRIEND_REQ_REJECT_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_FRIEND_REQ_REJECT_SUCCESS:
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(req => {
          return req.userUserId !== +action.userId
        }),
        loading: false,
        error: null
      }
    case actionTypes.ON_FRIEND_REQ_REJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.ON_FRIEND_REMOVE_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.ON_FRIEND_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        friends: state.friends.filter(friend => {
          return (friend.userUserId !== +action.friendId && friend.receiverUserId !== +action.friendId);
        })
      }
    case actionTypes.ON_FRIEND_REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;