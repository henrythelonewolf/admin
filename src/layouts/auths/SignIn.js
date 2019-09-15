import React from 'react';
import {
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Message,
} from 'semantic-ui-react';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleChangeUsername = (evt) => {
    const username = evt.target.value;
    this.setState({ username });
  }

  handleChangePassword = (evt) => {
    const password = evt.target.value;
    this.setState({ password });
  }

  handleSubmitAuth = (evt) => {
    const { username, password } = this.state;
    alert(username+password)
    evt.preventDefault();
  }

  render(){
    const { username, password } = this.state;

    return (
      <Grid textAlign={'center'} style={{ height: '100vh' }} verticalAlign={'middle'}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as={'h2'} textAlign={'center'}>
            LCP Supplies Employee's Portal
          </Header>
          <Form>
            <Segment>
            <Form.Input
            fluid
            value={username}
            placeholder={'Username'}
            onChange={this.handleChangeUsername}
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
            Forgot password?
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
