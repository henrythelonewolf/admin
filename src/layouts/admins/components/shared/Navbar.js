import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Navbar(){
  const classes = useStyles();

  return (
    <AppBar position="static" style={{ marginBottom: 20 }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          LCP Supplies Employee's Portal
        </Typography>

        <Button color="inherit" href={'/'}>Dashboard</Button>
        <Button color="inherit" href={'/orders'}>Orders</Button>
        <Button color="inherit" href={'/profiles'}>Profile</Button>

      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}))
