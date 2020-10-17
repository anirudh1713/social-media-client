import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/actionTypes';

import { Button, TextField, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

import * as validators from '../Validators/Validators';

//material ui alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChangePassword = (props) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState({value: '', valid: true, changed: false});
  const [newPassword, setNewPassword] = useState({value: '', valid: true, changed: false});
  const [disabled, setDisabled] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const oldPasswordValid = (pass) => {
    return pass.trim() !== '';
  }

  useEffect(() => {
    if (password.value.trim() !== '' && validators.isPassword(newPassword.value)) {
      setDisabled(false);
    }
  }, [password, newPassword]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password.value.trim() !== '' && validators.isPassword(newPassword.value)) {
      props.onUpdatePassword(password.value, newPassword.value, props.token)
    }else if(password.trim() === '') {
      setPassword({ ...password, changed: true, valid: false });
    }else if(!validators.isPassword(newPassword.value)) {
      setNewPassword({ ...newPassword, changed: true, valid: false });
    }
  };

  const onPasswordChangeHandler = (e) => {
    setPassword({ value: e.target.value, valid: oldPasswordValid(e.target.value), changed: true });
  };

  const onNewPasswordChange = (e) => {
    setNewPassword({ 
      value: e.target.value,
      valid: validators.isPassword(e.target.value),
      changed: true
    });
  };

  const onErrorCloseHandler = () => {
    props.onErrorClose();
  };

  const onSuccessCloseHandler = () => {
    props.onSuccessClose();
  }

  return (
    <>
      {props.error ?
        <Snackbar open={props.error ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onErrorCloseHandler}
        >
          <Alert onClose={onErrorCloseHandler} severity={"error"}>
            {"Something wrong happened."}
          </Alert>
        </Snackbar> : null
      } 
      {props.success ?
        <Snackbar open={props.success ? true : false} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={4000} 
                  onClose={onSuccessCloseHandler}
        >
          <Alert onClose={onSuccessCloseHandler} severity={"success"}>
            {"Password Changed."}
          </Alert>
        </Snackbar> : null
      }
      <Button fullWidth onClick={handleClickOpen} variant="outlined">Change Password</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
        <form autoComplete={"off"} noValidate onSubmit={onSubmitHandler}>
          <DialogContent>
            <Grid container spacing={2}>
              <TextField
                value={password.value}
                onChange={onPasswordChangeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Current Password"
                type="password"
                id="password"
                error={!password.valid ? true : false}
                helperText={!password.valid && 'Please enter current password'}
              />
              <TextField
                value={newPassword.value}
                onChange={onNewPasswordChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                error={!newPassword.valid ? true : false}
                helperText={!newPassword.valid && 'Password must be at least Minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character'}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} disabled={disabled} type="submit" color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.profile.passwordChangeError,
    success: state.profile.passwordChangeSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onErrorClose: () => dispatch({ type: actionTypes.ON_USER_PASSWORD_UPDATE_ERROR_CLEAR }),
    onSuccessClose: () => dispatch({ type: actionTypes.ON_USER_PASSWORD_UPDATE_SUCCESS_CLEAR })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);