import React, {useEffect} from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import NotFound404 from './Components/NotFound404';
import Profile from "./Components/Profile";
import Signup from "./Containers/Auth/Signup";
import Signin from "./Containers/Auth/Signin";
import Feed from "./Containers/Feed/Feed";
import NavBar from "./Components/NavBar";
import * as actionTypes from './store/actions/actionTypes';
import * as actions from './store/actions/index';

const App = (props) => {
  const { onAutoSignin, onPostsLoad, onFriendsLoad, onSentReqLoad, onPendingReqLoad } = props;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      onAutoSignin(token, userId);
      onPostsLoad(token);
      onFriendsLoad(token);
      onSentReqLoad(token);
      onPendingReqLoad(token);
    }
  }, [onAutoSignin, onPostsLoad, onFriendsLoad, onSentReqLoad, onPendingReqLoad]);

  const onLogoutHandler = () => {
    props.onLogout(props.token);
    props.history.push('/');
  };
  
  return (
    <React.Fragment>
      { props.token ? <NavBar logOutHandler={onLogoutHandler} userId={props.userId} /> : null }
      <Switch>
        <Route path={'/signup'} component={Signup} />
        <Route path={'/signin'} component={Signin} />
        {props.token ?
          <>
            <Route path={'/user/:id'} component={Profile} />  
            <Route exact path={'/'} component={Feed} /> 
          </> :
          <Route exact path={'/'} component={Signup} />
        }
        <Route path="*" component={NotFound404} />
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: (token, userId) => dispatch({ type: actionTypes.ON_AUTH_SUCCESS, token, userId }),
    onLogout: (token) => dispatch(actions.logout(token)),
    onPostsLoad: (token) => dispatch(actions.postsLoad(token)),
    onFriendsLoad: (token) => dispatch(actions.friendsLoad(token)),
    onSentReqLoad: (token) => dispatch(actions.onSentRequestLoad(token)),
    onPendingReqLoad: (token) => dispatch(actions.onPendingRequestLoad(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
