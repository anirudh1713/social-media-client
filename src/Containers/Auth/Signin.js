import React, {useState} from 'react';

import { Link as RLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = (props) => {
  const classes = useStyles();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  //on submit (SIGN IN)
  const onSigninHandler = (e) => {
    e.preventDefault();
    props.onSignin(email, password);
  };

  //email change handler
  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  //password change handler
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {props.token ? <Redirect to={'/'} /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSigninHandler}>
            <TextField
              value={email}
              onChange={onEmailChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={onPasswordChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RLink} to={'/signup'} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignin: (email, password) => dispatch(actions.signin(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);