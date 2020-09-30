import 'date-fns';
import React, { useState } from 'react';

import { Link as RLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import { TextField, Typography, Link, makeStyles, Container, CssBaseline, FormLabel, Radio, RadioGroup, Avatar, Grid, FormControl, FormControlLabel, Button } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

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
  }
}));

const Signup = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');

  //date change
  const dobChangeHandler = (date) => {
    setDob(date);
  };

  //gender change
  const genderChangeHandler = (e) => {
    setGender(e.target.value);
  }

  //username change
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  }

  //email change
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  //set password
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  //submit
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onSignup(username, email, password, dob, gender);
  }


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
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="uname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={usernameChangeHandler}
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
                  autoComplete="email"
                  value={email}
                  onChange={emailChangeHandler}
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
                  autoComplete="current-password"
                  value={password}
                  onChange={passwordChangeHandler}
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of birth"
                    value={dob}
                    onChange={dobChangeHandler}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item container>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={genderChangeHandler}>
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
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (username, email, password, dob, gender) => dispatch(actions.signup(username, email, password, dob, gender))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);