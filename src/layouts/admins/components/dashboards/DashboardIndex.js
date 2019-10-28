import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './../shared/Navbar';

export default function Dashboard(){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />

      <Container>
        <Grid container spacing={3}>

          <Grid item xs={3}>
           <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography className={classes.value}>
                500
              </Typography>
            </CardContent>
           </Card>
          </Grid>

          <Grid item xs={3}>
           <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Processing
              </Typography>
              <Typography className={classes.value}>
                500
              </Typography>
            </CardContent>
           </Card>
          </Grid>

          <Grid item xs={3}>
           <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Out-For-Delivery
              </Typography>
              <Typography className={classes.value}>
                500
              </Typography>
            </CardContent>
           </Card>
          </Grid>

          <Grid item xs={3}>
           <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                On-Hold
              </Typography>
              <Typography className={classes.value}>
                500
              </Typography>
            </CardContent>
           </Card>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
  },
  value: {
    fontSize: 44,
  },
}));
