import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Button,
} from '@material-ui/core';

import PageContainer from './../shared/PageContainer';
import { firebase } from './../../firebaseConfig';

export default function ProfileIndex() {
  const classes = useStyles();

  const handleSignOutPress = async () => {
    await firebase.auth().signOut().catch( (error) => {
      alert(error.toString());
    });
  }

  return (
    <PageContainer name={'My Profile'}>
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
    </PageContainer>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
