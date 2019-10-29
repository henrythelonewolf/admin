import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component={'a'} href={'/'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={'a'} href={'/calendars'}>
      <ListItemIcon>
        <CalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItem>

    <ListItem button component={'a'} href={'/orders'}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>

    <ListItem button component={'a'} href={'/creates'}>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItem>

    <ListItem button component={'a'} href={'/profiles'}>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>

  </div>
);
