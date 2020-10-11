import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: null,
  dob: null,
  gender: null,
  profilePhoto: null,
  userLoading: false,
  userError: null,
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
        profilePhoto: action.profilePhoto
      }
    case actionTypes.ON_PROFILE_LOAD_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.error
      }
    default:
      return state;
  }
};

export default reducer;