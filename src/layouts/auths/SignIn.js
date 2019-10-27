import React from 'react';
import {
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Message,
} from 'semantic-ui-react';
import { firebase } from './../../firebaseConfig';
import { Link } from 'react-router-dom';

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',

    loading: false,
  }

  handleChangeEmail = (evt) => {
    const email = evt.target.value;
    this.setState({ email });
  }

  handleChangePassword = (evt) => {
    const password = evt.target.value;
    this.setState({ password });
  }

  handleSubmitAuth = async (evt) => {
    evt.preventDefault();
    const { email, password } = this.state;

    this.setState({ loading: true });
    await firebase.auth().signInWithEmailAndPassword(email, password).then( (user) => {
      this.setState({ loading: false });
    })
    .catch( (error) => {
      this.setState({ loading: false });
      alert(error.toString());
    });
  }

  render(){
    const { email, password, loading } = this.state;

    return (
      <Grid textAlign={'center'} style={{ height: '100vh' }} verticalAlign={'middle'}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as={'h2'} textAlign={'center'}>
            LCP Supplies Employee's Portal
          </Header>
          <Form loading={loading ? true : false}>
            <Segment>
            <Form.Input
            fluid
            value={email}
            placeholder={'Email'}
            onChange={this.handleChangeEmail}
            />
            <Form.Input
            fluid
            value={password}
            placeholder={'Password'}
            onChange={this.handleChangePassword}
            />
            <Button
            color={'green'}
            type="submit"
            fluid
            onClick={this.handleSubmitAuth}
            >Sign In</Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/auth/forgotPassword">Forgot password?</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
