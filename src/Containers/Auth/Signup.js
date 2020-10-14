import 'date-fns';
import React, { useState } from 'react';

import { Link as RLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as validators from '../../Validators/Validators';
import { ON_AUTH_ERROR_CLOSE } from '../../store/actions/actionTypes';

import { TextField, Typography, Link, makeStyles, Container, CssBaseline, 
         FormLabel, Radio, RadioGroup, Avatar, Grid, FormControl, FormControlLabel, 
         Button, LinearProgress } 
from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

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
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  genderStyle: {
    display: 'flex'
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
}));

const Signup = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState({ value: '', valid: true, changed: false });
  const [email, setEmail] = useState({ value: '', valid: true, changed: false });
  const [password, setPassword] = useState({ value: '', valid: true, changed: false });
  const [dob, setDob] = useState({ value: new Date(), valid: true, changed: false });
  const [gender, setGender] = useState({ value: '', valid: true, changed: false });

  //date change
  const dobChangeHandler = (date) => {
    setDob({
      value: date,
      changed: true,
      valid: validators.isDate(date)
    });
  };

  //gender change
  const genderChangeHandler = (e) => {
    setGender({
      value: e.target.value,
      changed: true,
      valid: validators.isGender(e.target.value)
    });
  }

  //username change
  const usernameChangeHandler = (e) => {
    setUsername({
      value: e.target.value,
      changed: true,
      valid: validators.isUsername(e.target.value)
    });
  }

  //email change
  const emailChangeHandler = (e) => {
    setEmail({
      value: e.target.value,
      changed: true,
      valid: validators.isEmail(e.target.value)
    });
  }

  //set password
  const passwordChangeHandler = (e) => {
    setPassword({
      value: e.target.value,
      changed: true,
      valid: validators.isPassword(e.target.value)
    });
  }

  /****************** ON SIGNUP *************************/
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(validators.isEmail(email.value) 
        && validators.isUsername(username.value) 
        && validators.isDate(dob.value) 
        && validators.isPassword(password.value) 
        && validators.isGender(gender.value)) {
          props.onSignup(username.value, email.value, password.value, dob.value, gender.value);
    } else {
      if (!validators.isUsername(username.value)) {
        setUsername({ ...username, valid: false, changed: true });
      } else if(!validators.isEmail(email.value)) {
        setEmail({ ...email, valid: false, changed: true }); 
      } else if (!validators.isPassword(password.value)) {
        setPassword({ ...password, valid: false, changed: true });
      } else if (!validators.isDate(dob.value)) {
        setDob({ ...dob, valid: false, changed: true });
      } else if (!validators.isGender(gender.value)) {
        setGender({ ...gender, valid: false, changed: true });
      }
    }
  }

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
            Sign up
          </Typography>
          <form className={classes.form} autoComplete={"off"} noValidate onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  id="standard-error-helper-text"
                  autoFocus
                  value={username.value}
                  onChange={usernameChangeHandler}
                  error={!username.valid ? true : false}
                  helperText={!username.valid && "Numbers and special characters are not allowed."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email.value}
                  onChange={emailChangeHandler}
                  error={!email.valid ? true : false}
                  helperText={!email.valid && "Enter a valid email address."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password.value}
                  onChange={passwordChangeHandler}
                  error={!password.valid ? true : false}
                  helperText={!password.valid && "Password must be at least Minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character"}
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of birth"
                    value={dob.value}
                    onChange={dobChangeHandler}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    error={!dob.valid}
                    helperText={!dob.valid && "You must be 16 years or older."}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item container>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" 
                              name="gender1" 
                              value={gender.value} 
                              onChange={genderChangeHandler}
                  >
                    <div className={classes.genderStyle}>
                      <FormControlLabel value="F" control={<Radio />} label="Female" />
                      <FormControlLabel value="M" control={<Radio />} label="Male" />
                      <FormControlLabel value="O" control={<Radio />} label="Other" />
                    </div>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={props.loading ? true : false}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RLink} to={'/signin'} variant="body2">
                  Already have an account? Sign in
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
    onSignup: (username, email, password, dob, gender) => dispatch(actions.signup(username, email, password, dob, gender)),
    onErrorClose: () => dispatch({ type: ON_AUTH_ERROR_CLOSE })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);