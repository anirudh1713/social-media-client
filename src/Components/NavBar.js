import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PendingRequest from './PendingRequest';

import { fade, makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import UserSearch from './UserSearch';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { List } from '@material-ui/core';


//Custom MUI css
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { token } = props;

  useEffect(() => {
    if (search.trim() !== '') {
      axios.get(`http://localhost:30001/search?username=${search.trim().toLowerCase()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setFilteredUsers(res.data.users);
      }).catch(err => {
        console.log(err);
      });
    }else {
      setFilteredUsers([]);
    }
  }, [search, token]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //handler functions
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //dialogs handler
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //pending requests dialogs
  const [reqOpen, setReqOpen] = useState(false);

  const handleClickOpenReq = () => {
    setReqOpen(true);
  };

  const handleCloseReq = () => {
    setReqOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {handleMenuClose(); props.history.push(`/user/${props.userId}`);} }>Profile</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); props.logOutHandler();} }>Log out</MenuItem>
    </Menu>
  );

  //pending req data
  let pendingReqList = null;
  if (props.pendingRequests && props.pendingRequests.length > 0) {
    pendingReqList = props.pendingRequests.map(req => {
      return <PendingRequest key={req.user.user_id}
                             username={req.user.username}
                             userId={req.user.user_id}
                             userProfileImage={req.user.profile_photo}
                             onAcceptReq={props.onAcceptReq}
                             onRejectReq={props.onRejectReq}
                             onClose={handleCloseReq}
                             token={props.token}
             />;
    });
  }

  //mobile menu
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem onClick={handleClickOpenReq}>
        <IconButton color="inherit">
          <Badge badgeContent={props.pendingRequests ? props.pendingRequests.length : null} color="secondary">
            <PersonAddIcon />
          </Badge>
          <Dialog open={reqOpen} fullWidth onClose={handleCloseReq} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Pending Requests</DialogTitle>
            <DialogContent>
              {props.pendingRequests && props.pendingRequests.length > 0 ?
                <List dense>
                  {pendingReqList}
                </List>
                : `No Pending Requests`
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseReq} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </IconButton>
        <p>Pending Requests</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //search results
  let searchResults = null;
  if (filteredUsers.length > 0) {
    searchResults = filteredUsers.map(user => {
      return (<UserSearch key={user.user_id} 
                         userId={user.user_id} 
                         userProfileImage={user.profile_photo} 
                         username={user.username}
                         onClose={handleClose}
              />);
    });
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button color={"inherit"} onClick={() => props.history.push('/')}>
            <Typography variant="h6">
              Social Media
            </Typography>
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onClick={handleClickOpen}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Search</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="search"
                  type="text"
                  autoComplete="off"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {filteredUsers.length > 0 ?
                  <List dense>
                    {searchResults}
                  </List> : null
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={handleClickOpenReq} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={props.pendingRequests ? props.pendingRequests.length : null} color="secondary">
                <PersonAddIcon />
              </Badge>
            </IconButton>
            <Dialog open={reqOpen} fullWidth onClose={handleCloseReq} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Pending Requests</DialogTitle>
              <DialogContent>
                {props.pendingRequests && props.pendingRequests.length > 0 ?
                  <List dense>
                    {pendingReqList}
                  </List>
                  : `No Pending Requests`
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseReq} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(NavBar);