import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: null,
  dob: null,
  gender: null,
  profilePhoto: null,
  userLoading: false,
  userError: null,
  email: null,
  dataUpdateLoading: false,
  dataUpdateError: null,
  dataUpdateSuccess: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_PROFILE_LOAD_START:
      return {
        ...state,
        userLoading: true,
        userError: null
      }
    case actionTypes.ON_PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        userLoading: false,
        username: action.username,
        dob: action.dob,
        gender: action.gender,
        profilePhoto: action.profilePhoto,
        email: action.email
      }
    case actionTypes.ON_PROFILE_LOAD_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.error
      }
    case actionTypes.ON_ADD_PROFILE_IMAGE_START:
      return {
        ...state
      }
    case actionTypes.ON_ADD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profilePhoto: action.profileImage
      }
    case actionTypes.ON_ADD_PROFILE_IMAGE_FAIL:
      return {
        ...state,
        profileImageError: action.error
      }
    case actionTypes.ON_USER_DATA_UPDATE_START:
      return {
        ...state,
        dataUpdateLoading: true
      }
    case actionTypes.ON_USER_DATA_UPDATE_SUCCESS:
      return {
        ...state,
        dataUpdateSuccess: true,
        username: action.username,
        email: action.email,
        dob: action.dob,
        gender: action.gender
      }
    case actionTypes.ON_USER_DATA_UPDATE_FAIL:
      return {
        ...state,
        dataUpdateError: action.error
      }
    case actionTypes.ON_USER_DATA_UPDATE_SUCCESS_CLEAR:
      return {
        ...state,
        dataUpdateSuccess: false
      }
    case actionTypes.ON_USER_DATA_UPDATE_ERROR_CLEAR:
      return {
        ...state,
        dataUpdateError: null
      }
    default:
      return state;
  }
};

export default reducer;