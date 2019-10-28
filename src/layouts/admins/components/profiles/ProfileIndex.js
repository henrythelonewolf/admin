import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Navbar from './../shared/Navbar';

import { firebase } from './../../../../firebaseConfig';

export default function ProfileIndex() {
  const classes = useStyles();

  const handleSignOutPress = async () => {
    await firebase.auth().signOut().catch( (error) => {
      alert(error.toString());
    });
  }

  return (
    <div className={classes.root}>
    <Navbar />

    <Container>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <Button onClick={ () => handleSignOutPress() }>Sign Out</Button>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
          Activities
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
}));
