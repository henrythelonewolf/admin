import React from 'react';
import {
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { firebase } from './../../firebaseConfig';
import { Link } from 'react-router-dom';

export default class ForgotPassword extends React.Component {
  state = {
    email: '',
    reset: false,
    loading: false,
  }

  handleChangeEmail = (evt) => {
    const email = evt.target.value;
    this.setState({ email });
  }

  handleSubmitReset = async (evt) => {
    evt.preventDefault();
    const { email } = this.state;

    this.setState({ loading: true });
    await firebase.auth().sendPasswordResetEmail(email).then( (user) => {
      this.setState({
        loading: false,
        reset: true
      });
    })
    .catch( (error) => {
      this.setState({ loading: false });
      alert(error.toString());
    });
  }

  render(){
    const { email, loading, reset } = this.state;

    if (reset) {
      return (
        <Grid textAlign={'center'} style={{ height: '100vh' }} verticalAlign={'middle'}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as={'h2'} icon textAlign='center'>
              <Icon name={'check'} circular color={'green'} />
              <Header.Content>Please check your email to reset password</Header.Content>
            </Header>
            <Link to={"/auth/signin"}>Go to Sign In page</Link>
          </Grid.Column>
        </Grid>
      )
    } else {
      return (
        <Grid textAlign={'center'} style={{ height: '100vh' }} verticalAlign={'middle'}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as={'h2'} textAlign={'center'}>
              LCP Supplies Employee's Portal
              <Header.Subheader>Password Reset</Header.Subheader>
            </Header>
            <Form loading={loading ? true : false}>
              <Segment>
              <Form.Input
              fluid
              value={email}
              placeholder={'Email'}
              onChange={this.handleChangeEmail}
              />
              <Button
              color={'green'}
              type="submit"
              fluid
              onClick={this.handleSubmitReset}
              >Reset</Button>
              </Segment>
            </Form>
            <Message>
              <Link to={"/auth/signin"}>Go to Sign In page</Link>
            </Message>
          </Grid.Column>
        </Grid>
      )
    }
  }
}
