import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.ON_AUTH_SUCCESS:
      return {
        loading: false,
        error: null,
        token: action.token,
        userId: action.userId
      };
    case actionTypes.ON_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.ON_LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userId: null
      }
    case actionTypes.ON_LOGOUT_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.ON_AUTH_ERROR_CLOSE:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export default store;