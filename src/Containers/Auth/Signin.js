import React, {useState} from 'react';

import { Link as RLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as validators from '../../Validators/Validators';
import { ON_AUTH_ERROR_CLOSE } from '../../store/actions/actionTypes';

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
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, LinearProgress } from '@material-ui/core';

//material ui alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
}));

const Signin = (props) => {
  const classes = useStyles();

  const [ email, setEmail ] = useState({ value: '', valid: true, changed: false });
  const [ password, setPassword ] = useState('');

  //on submit (SIGN IN)
  const onSigninHandler = (e) => {
    e.preventDefault();
    if(validators.isEmail(email.value)) {
        props.onSignin(email.value, password);
    } else {
      if(!validators.isEmail(email.value)) {
        setEmail({ ...email, valid: false, changed: true }); 
      }
    }
  };

  //email change handler
  const onEmailChangeHandler = (e) => {
    setEmail({
      ...email, 
      value:e.target.value, 
      changed: true,
      valid: validators.isEmail(email.value)
    });
  };

  //password change handler
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  /************************* Error Handling *************************************/
  const onErrorCloseHandler = () => {
    props.onErrorClose();
  }

  let errorContent = null;
  if (props.error) {
    errorContent = (
      <div className={classes.root}>
        <Snackbar open={props.error ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onErrorCloseHandler}
        >
          <Alert onClose={onErrorCloseHandler} severity={"error"}>
            {props.error}
          </Alert>
        </Snackbar>
      </div>
    );
  }


  return (
    <>
      {props.token ? <Redirect to={'/'} /> : null}
      {props.loading && <LinearProgress color="secondary" />}
      {errorContent}
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
              value={email.value}
              onChange={onEmailChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoFocus
              error={!email.valid ? true : false}
              helperText={!email.valid && "Enter a valid email address."}
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
              disabled={props.loading}
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
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignin: (email, password) => dispatch(actions.signin(email, password)),
    onErrorClose: () => dispatch({ type: ON_AUTH_ERROR_CLOSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);