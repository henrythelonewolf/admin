import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CheckIcon from '@material-ui/icons/Check';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { firebase } from './../../firebaseConfig';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      LCP Supplies Sdn. Bhd.
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function ForgotPassword() {
  const classes = useStyles();

  const [ values, setValues ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmitReset = async (evt) => {
    evt.preventDefault();
    const { email } = values;

    if (email === undefined) {
      alert('Invalid email address')
    } else {
      setLoading(true);
      await firebase.auth().sendPasswordResetEmail(email).then( (user) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch( (error) => {
        setLoading(false);
        alert(error.toString());
      });
    }
  }

  if (success) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LCP Supplies Employee's Portal
          </Typography>

          <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ paddingTop: 100, paddingBottom: 100 }}
          >
          <Avatar className={classes.avatar}>
            <CheckIcon color={'green'} />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
            Reset instruction sent!
            <br />
            Please check your email
          </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs>
              <Link href="/auth/signin" variant="body2">
                Go to Sign In page
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            LCP Supplies Employee's Portal
          </Typography>

          <br /><br />
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmitReset}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange('email')}
            />

            <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs>
                <Link href="/auth/signin" variant="body2">
                  Go to Sign In page
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));
