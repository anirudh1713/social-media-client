import * as actionTypes from './actionTypes';
import axios from 'axios';

export const profileLoad = (profileUserId, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_PROFILE_LOAD_START });
    axios.get(`http://localhost:30001/user/${profileUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch({
        type: actionTypes.ON_PROFILE_LOAD_SUCCESS,
        username: res.data.user.username,
        dob: res.data.user.dob,
        gender: res.data.user.gender,
        profilePhoto: res.data.user.profile_photo,
        email: res.data.user.email
      });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_PROFILE_LOAD_FAIL, error: err.response.data.error });
    });
  };
};

export const addProfileImage = (profileImage, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_ADD_PROFILE_IMAGE_START });
    axios.patch(`http://localhost:30001/user/profileimage`, profileImage, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ type: actionTypes.ON_ADD_PROFILE_IMAGE_SUCCESS, profileImage: res.data.profile_url });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_ADD_PROFILE_IMAGE_FAIL, error: err.response.data.error });
    })
  }
}

export const updateUserData = (data, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_USER_DATA_UPDATE_START });
    axios.patch(`http://localhost:30001/user/data`, {
      ...data
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      dispatch({ 
        type: actionTypes.ON_USER_DATA_UPDATE_SUCCESS,
        username: data.username,
        dob: data.dob,
        gender: data.gender,
        email: data.email
      });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_USER_DATA_UPDATE_FAIL, error: err.response.data.error });
    });
  }
};

export const changePassword = (oldPass, newPass, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_USER_PASSWORD_UPDATE_START });
    axios.patch('http://localhost:30001/user/password', {
      password: oldPass,
      newPassword: newPass
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch({ type: actionTypes.ON_USER_PASSWORD_UPDATE_SUCESS });
    }).catch(err => {
      console.log(err);
      if (err.response.data.error) {
        dispatch({ type: actionTypes.ON_USER_PASSWORD_UPDATE_FAIL, error: err.response.data.error });
      }else {
        dispatch({ type: actionTypes.ON_USER_PASSWORD_UPDATE_FAIL, error: err });
      }
      
    })
  }
}