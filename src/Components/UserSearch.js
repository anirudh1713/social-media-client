import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

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
    <Link to={`/user/${props.userId}`} onClick={props.onClose} className={classes.linkClass}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={props.userProfileImage}>
            {props.userProfileImage ? null : `${props.username}`}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${props.username}`} />
      </ListItem>
    </Link>
  );
};

export default UserSearch;