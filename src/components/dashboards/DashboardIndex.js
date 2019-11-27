import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from './../shared/PageContainer';

export default function DashboardIndex(){
  const classes = useStyles();

  return (
    <PageContainer name={'Dashboard'}>
      <Grid container spacing={2}>

        <Grid item xs={3}>
          <Card>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Pending
            </Typography>
            <Typography variant="h3" component="h2">
              5000
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
            <Typography variant="h3" component="h2">
              5000
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
            <Typography variant="h3" component="h2">
              5000
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
            <Typography variant="h3" component="h2">
              5000
            </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})
