import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { mainListItems } from './listItems';
import { secondaryListItems } from './listItems';
import { useStyles } from './Styles';
import Copyright from './Copyright';

export default function PageContainer({ children, name }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);

  const isProfileMenuOpen = Boolean(anchorProfileEl);
  const isNotificationMenuOpen = Boolean(anchorNotificationEl);

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const handleNotificationClose = () => {
    setAnchorNotificationEl(null)
  }

  const handleProfileMenuOpen = event => {
    setAnchorProfileEl(event.currentTarget);
  };
  const menuProfileId = 'profile-menu';
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuProfileId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileClose}
    >
      <MenuItem component={'a'} href={'/profiles'}>My Profile</MenuItem>
    </Menu>
  );

  const handleNotificationMenuOpen = event => {
    setAnchorNotificationEl(event.currentTarget);
  };
  const menuNotificationId = 'notification-menu';
  const renderNotificationMenu = (
    <Menu
      anchorEl={anchorNotificationEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuNotificationId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationClose}
    >
      <MenuItem component={'a'} href={'#'}>Notification 1</MenuItem>
      <MenuItem component={'a'} href={'#'}>Notification 2</MenuItem>
      <MenuItem component={'a'} href={'#'}>Notification 3</MenuItem>
      <MenuItem component={'a'} href={'#'}>Notification 4</MenuItem>
      <MenuItem component={'a'} href={'#'}>Notification 5</MenuItem>
    </Menu>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {name}
          </Typography>

          <IconButton
            edge="end"
            aria-label="notification for current user"
            aria-controls={menuNotificationId}
            aria-haspopup="true"
            onClick={handleNotificationMenuOpen}
            color="inherit"
          >
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuProfileId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      
      {renderProfileMenu}
      {renderNotificationMenu}

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>

        <Divider />
        <List>{secondaryListItems}</List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
