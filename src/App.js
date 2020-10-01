import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Signup from "./Containers/Auth/Signup";
import Signin from "./Containers/Auth/Signin";
import Feed from "./Containers/Feed/Feed";
import NavBar from "./Components/NavBar";
import * as actionTypes from './store/actions/actionTypes';
import * as actions from './store/actions/index';

const App = (props) => {
  const { onAutoSignin } = props;
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      onAutoSignin(token, userId);
    }
  }, [onAutoSignin]);

  const onLogoutHandler = () => {
    props.onLogout(props.token);
  };

  return (
    <React.Fragment>
      { props.token ? <NavBar logOutHandler={onLogoutHandler} /> : null }
      <Switch>
        <Route path={'/signup'} component={Signup} />
        <Route path={'/signin'} component={Signin} />
        {props.token ?
          <Route path={'/'} component={Feed} /> :
          <Route path={'/'} component={Signup} />
        }
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: (token, userId) => dispatch({ type: actionTypes.ON_AUTH_SUCCESS, token, userId }),
    onLogout: (token) => dispatch(actions.logout(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
