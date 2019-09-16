import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { firebase } from './../../../../firebaseConfig';
import store from './../../../../store';
import { withRouter } from 'react-router-dom';

class ProfileIndex extends React.Component {

  handleSignOutPress = async () => {
    await firebase.auth().signOut().then( () => {
      store.setState({
        currentUser: {},
      });
      this.props.history.push('/auth/signin');
    }).catch( (error) => {
      alert(error.toString());
    });
  }

  render(){
    return (
      <Container>
        <Button onClick={this.handleSignOutPress}>Sign Out</Button>
      </Container>
    )
  }
}

export default withRouter(ProfileIndex);
