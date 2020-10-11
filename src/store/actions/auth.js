import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signup = (username, email, password, dob, gender) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_AUTH_START });
    axios.post('http://localhost:30001/signup', {
      username,
      email,
      password,
      dob,
      gender
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.user_id);
      dispatch({ type: actionTypes.ON_AUTH_SUCCESS, token: res.data.token, userId: res.data.user.user_id });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_AUTH_FAIL, error: err.response.data.error });
    });
  }
};

export const signin = (email, password) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_AUTH_START });
    axios.post('http://localhost:30001/signin', {
      email,
      password
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.user_id);
      dispatch({ type: actionTypes.ON_AUTH_SUCCESS, token: res.data.token, userId: res.data.user.user_id });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_AUTH_FAIL, error: err.response.data.error });
    });
  }
};

export const logout = (token) => {
  return dispatch => {
    axios.post('http://localhost:30001/user/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch({ type: actionTypes.ON_LOGOUT_SUCCESS });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_LOGOUT_FAIL, error: err.response.data.error });
    });
  }
};