import React, { useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import MuiAlert from '@material-ui/lab/Alert'
import { Grid, Card, CardContent, CardHeader, 
          TextField, CardActions, Button, makeStyles, Icon, 
          LinearProgress, Snackbar } 
from "@material-ui/core";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const CreatePost = (props) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [postComplete, setPostComplete] = useState(false);
  const [error, setError] = useState(null);

  const classes = useStyles();

  //submit handler to create post
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('post_image', file);
    //post req to server to create a new post
    props.onAddPost(props.token, formData);
  };

  //to close error or success post snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPostComplete(false);
    setError(null);
  };

  return (
    <>
      <Grid item xs={12}>
        {props.loading ? <div className={classes.root}>
                            <LinearProgress color="secondary" />
                    </div> : null
        }
        {postComplete ? 
          <Snackbar open={postComplete} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} >
            <Alert onClose={handleClose} severity="success">
              Post Added Successfully!
            </Alert>
          </Snackbar> : null
        }
        {error ? 
          <Snackbar open={error ? true : false} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} >
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar> : null
        }
        <Card>
          <CardHeader title={"Add a new post!"} />   
          {/* Card media */}
          <form onSubmit={onSubmitHandler}>
            <CardContent>
              <TextField
                value={description}
                disabled={props.loading ? true : false}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                id="standard-textarea"
                label="Say something..."
                multiline
              />
            </CardContent>
            <CardActions>
              <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              disabled={props.loading ? true : false}
              onChange={(e) => setFile(e.target.files[0])}
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
          </form>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.posts.addPostLoading,
    error: state.posts.addPostError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (token, formData) => dispatch(actions.addPost(token, formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);