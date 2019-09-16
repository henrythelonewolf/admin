import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

export default class Loading extends React.Component {
  render(){
    return (
      <Container>
        <div style={{ paddingTop: 450}}>
        <Loader active inline={'centered'}>
        Loading
        </Loader>
        </div>
      </Container>
    )
  }
}
