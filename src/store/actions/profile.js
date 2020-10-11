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
        profilePhoto: res.data.user.profile_photo
      });
    }).catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.ON_PROFILE_LOAD_FAIL, error: err.response.data.error });
    });
  };
};