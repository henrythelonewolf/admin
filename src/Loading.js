import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(){
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%'
  }
}))
