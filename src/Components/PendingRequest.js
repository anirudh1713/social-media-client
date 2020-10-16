import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, ListItem, ListItemAvatar, ListItemText, Avatar, 
          ListItemSecondaryAction, IconButton } 
from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  linkClass: {
    textDecoration: 'none',
    color: 'inherit',
    '&:link': {
      textDecoration: 'none',
      color: 'inherit'
    },
    '&:active': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
});

const UserSearch = (props) => {
  const classes = useStyles();

  return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.userProfileImage}>
            {props.userProfileImage ? null : `${props.username}`}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${props.username}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="comments"
                      onClick={() => props.onAcceptReq(props.token, props.userId)}
          >
            <CheckIcon />
          </IconButton>
          <IconButton aria-label="comments"
                      onClick={() => props.onRejectReq(props.token, props.userId)}
          >
            <CloseIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
  );
};

export default withRouter(UserSearch);