import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { firebase } from './../../../../firebaseConfig';

class ProfileIndex extends React.Component {

  handleSignOutPress = async () => {
    await firebase.auth().signOut().catch( (error) => {
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

export default ProfileIndex;
