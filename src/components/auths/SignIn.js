import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';

import { useStyles } from './Styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { firebase } from './../../firebaseConfig';
import Copyright from './../shared/Copyright';

export default function SignIn() {
  const classes = useStyles();

  const [ values, setValues ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = values;

    if (email === undefined || password === undefined) {
      alert('Invalid email address or password')
    } else {
      setLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password).then( (user) => {
        setLoading(false);
      })
      .catch( (error) => {
        setLoading(false);
        alert(error.toString());
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          LCP Supplies Employee's Portal
        </Typography>

        <br /><br />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange('password')}
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
            Sign In
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
              <Link href="/auth/forgotPassword" variant="body2">
                Forgot password?
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
