import 'date-fns';
import React, { useState } from 'react';
import axios from 'axios';

import { TextField, Typography, Link, makeStyles, Container, CssBaseline, FormLabel, Radio, RadioGroup, Avatar, Grid, FormControl, FormControlLabel, Button, Box, Checkbox } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Social Media
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  genderStyle: {
    display: 'flex'
  }
}));

const Signup = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [loggedin, setLoggedin] = useState(false); //keep me logged in checkbox

  //date change
  const dobChangeHandler = (date) => {
    console.log(typeof(date));
    console.log(date)
    setDob(date);
  };

  //gender change
  const genderChangeHandler = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  }

  //username change
  const usernameChangeHandler = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  }

  //email change
  const emailChangeHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  //set password
  const passwordChangeHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }

  //logged in checkbox change
  const loggedinChangeHandler = () => {
    setLoggedin(prevState => {
      return !prevState;
    });
  }

  //submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:30001/signup', {
        username,
        email,
        password,
        dob,
        gender,
        loggedin
      });
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  }


  return (
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
            <Grid item xs={12}>
              <FormControlLabel
                checked={loggedin}
                onChange={loggedinChangeHandler}
                control={<Checkbox value="keepMeLoggedIn" color="primary" />}
                label="Keep me logged in"
              />
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
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup;