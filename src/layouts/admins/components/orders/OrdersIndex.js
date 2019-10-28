import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListViewIndex from './listView/ListViewIndex';
import DropdownViewIndex from './dropdownView/DropdownViewIndex';
import DetailViewIndex from './detailView/DetailViewIndex';

import Navbar from './../shared/Navbar';

export default function OrdersIndex(){
  const classes = useStyles();
  const [ view, setView ] = useState('dropdown');

  return (
    <div className={classes.root}>
      <Navbar />

      {view === 'list' && (
        <ListViewIndex />
      )}

      {view === 'dropdown' && (
        <DropdownViewIndex />
      )}

      {view === 'detail' && (
        <DetailViewIndex />
      )}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));
