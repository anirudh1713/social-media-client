import React, { useState } from 'react';

import * as validators from '../Validators/Validators';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Grid, FormControl, Radio, FormLabel, FormControlLabel, RadioGroup, makeStyles } from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
  genderStyle: {
    display: 'flex'
  }
});

const UserDataUpdate = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState({ value: props.username, valid: true, changed: false });
  const [email, setEmail] = useState({ value: props.email, valid: true, changed: false });
  const [dob, setDob] = useState({ value: new Date(props.dob), valid: true, changed: false });
  const [gender, setGender] = useState({ value: props.gender, valid: true, changed: false });

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /****************** ON SIGNUP *************************/
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(validators.isEmail(email.value) 
        && validators.isUsername(username.value) 
        && validators.isDate(dob.value) 
        && validators.isGender(gender.value)) {
          props.onUpdateData({
            username: username.value, 
            email: email.value, 
            dob: dob.value, 
            gender: gender.value
          }, props.token);
    } else {
      if (!validators.isUsername(username.value)) {
        setUsername({ ...username, valid: false, changed: true });
      } else if(!validators.isEmail(email.value)) {
        setEmail({ ...email, valid: false, changed: true }); 
      } else if (!validators.isDate(dob.value)) {
        setDob({ ...dob, valid: false, changed: true });
      } else if (!validators.isGender(gender.value)) {
        setGender({ ...gender, valid: false, changed: true });
      }
    }
  }

  return (
    <>
      <Button fullWidth onClick={handleClickOpen} variant="outlined">Edit information</Button>
      <Dialog open={open}
              onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Update Information"}</DialogTitle>
        <form autoComplete={"off"} noValidate onSubmit={onSubmitHandler}>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} type="submit" color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UserDataUpdate;