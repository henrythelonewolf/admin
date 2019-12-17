import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import CalendarIcon from '@material-ui/icons/CalendarToday';

const ListItemChild = ({ children, route, title }) => {
  return (
    <ListItem button component={'a'} href={route}>
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )
}

export const mainListItems = (
  <div>
  {/*
    <ListItemChild title='Dashboard' route='/'><DashboardIcon /></ListItemChild>
    <ListItemChild title='Calendars' route='/calendars'><CalendarIcon /></ListItemChild>
    */}
    <ListItemChild title='Order List' route='/orders'><ShoppingCartIcon /></ListItemChild>
    <ListItemChild title='Create Order' route='/creates'><AddBoxIcon /></ListItemChild>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Manage</ListSubheader>
    <ListItemChild title="Companies" route="/companies"><AssignmentIcon /></ListItemChild>
    <ListItemChild title="Products" route="/products"><AssignmentIcon /></ListItemChild>
    <ListItemChild title="Assignees" route="/assignees"><AssignmentIcon /></ListItemChild>
  </div>
);
