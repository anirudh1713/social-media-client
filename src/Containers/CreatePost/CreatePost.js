import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';

import { Grid, Card, CardContent, CardHeader, 
          TextField, CardActions, Button, makeStyles, Icon, 
          LinearProgress, CardMedia } 
from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

//material ui alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//custom css for MUI
const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const CreatePost = (props) => {
  const [description, setDescription] = useState({ value: '', valid: true, changed: false });
  const [file, setFile] = useState({ file: null, imagePreviewUrl: '' });

  const classes = useStyles();

  const { success, error } = props;

  /************ clear input when post is complete ****************/
  useEffect(() => {
    if (success || error) {
      setDescription({
        value: "",
        valid: true,
        changed: false
      });
      setFile({
        file: null,
        imagePreviewUrl: ""
      });
    }
  }, [success, error]);

  /*********** submit handler to CREATE POST ***************/
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (description.value.trim() !== '' || file.file) {
      const formData = new FormData();
      formData.append('description', description.value);
      formData.append('post_image', file.file);
      props.onAddPost(props.token, formData);
    }else {
      setDescription({ ...description, valid: false, changed: true });
    }
  };

  /************ ON DESCRIPTION CHANGE ******************/
  const descriptionChangeHandler = (e) => {
    setDescription({
      value: e.target.value,
      valid: e.target.value.trim() !== '',
      changed: true
    });
  };

  /*************** FILE CHANGE ********************/
  const fileChangeHandler = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onloadend = () => {
        setFile({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  };

  /*************** SnackBar Close *******************/
  const onErrorCloseHandler = () => {
    props.onAddPostErrorClear();
    
  };

  const onSuccessCloseHandler = () => {
    props.onAddPostSuccessClear();
  }

  return (
    <>
      <Grid item xs={12}>
        {props.loading ? 
          <div className={classes.root}>
            <LinearProgress color="secondary" />
          </div> : null
        }  
        <form onSubmit={onSubmitHandler}>
          <Card>
          {props.error ?
            <Snackbar open={props.error ? true : false} 
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      autoHideDuration={4000} 
                      onClose={onErrorCloseHandler}
            >
              <Alert onClose={onErrorCloseHandler} severity={"error"}>
                {props.error}
              </Alert>
            </Snackbar> : null
          } 
          {success ?
            <Snackbar open={success ? true : false} 
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      autoHideDuration={4000} 
                      onClose={onSuccessCloseHandler}
            >
              <Alert onClose={onSuccessCloseHandler} severity={"success"}>
                {"Post Added!"}
              </Alert>
            </Snackbar> : null
          }
            <CardHeader title={"Add a new post!"} />   
            {file.imagePreviewUrl &&
              <CardMedia className={classes.media}
                        image={file.imagePreviewUrl}
                        title="Photo"
              />
            }
            <CardContent>
              <TextField
                value={description.value}
                disabled={props.loading ? true : false}
                onChange={descriptionChangeHandler}
                fullWidth
                id="standard-textarea"
                label="Say something..."
                multiline
                error={(!description.valid && !file.file)}
                helperText={(!description.valid && !file.file) ? "Please enter description or image." : null}
              />
            </CardContent>
            <CardActions>
              <input accept="image/*"
                     className={classes.input}
                     id="contained-button-file"
                     disabled={props.loading ? true : false}
                     onChange={fileChangeHandler}
                     type="file"
              />
              <label htmlFor="contained-button-file">
                <Button disabled={props.loading ? true : false} variant="outlined" color="secondary" component="span">
                  Upload
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={props.loading ? true : false}
                className={classes.button}
                endIcon={<Icon>send</Icon>}
              >
                Post
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.posts.addPostLoading,
    error: state.posts.addPostError,
    success: state.posts.addPostSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (token, formData) => dispatch(actions.addPost(token, formData)),
    onAddPostSuccessClear: () => dispatch({ type: actionTypes.ON_ADD_POST_SUCCESS_CLEAR }),
    onAddPostErrorClear: () => dispatch({ type: actionTypes.ON_ADD_POST_ERROR_CLEAR })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);