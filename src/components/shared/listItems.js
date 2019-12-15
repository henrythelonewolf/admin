import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddBoxIcon from '@material-ui/icons/AddBox';
// import CalendarIcon from '@material-ui/icons/CalendarToday';
import AssignmentIcon from '@material-ui/icons/Assignment';

export class ListItemChild extends Component {
  render() {
    return (
      <ListItem button component={'a'} href={this.props.route}>
        <ListItemIcon>
          {this.props.children}
        </ListItemIcon>
        <ListItemText primary={this.props.title} />
      </ListItem>
    );
  }
}

export const mainListItems = (
  <div>
    {/* <ListItem button component={'a'} href={'/'}>
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
    </ListItem> */}
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
