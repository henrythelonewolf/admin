import React from 'react';
import { Container } from 'semantic-ui-react';
import Stats from './Stats';

export default class DashboardIndex extends React.Component {
  render(){
    return (
      <Container>
        <Stats label={'Sales'} value={'5000'} />
        <Stats label={'Sales'} value={'5000'} />
        <Stats label={'Sales'} value={'5000'} />
        <Stats label={'Sales'} value={'5000'} />
      </Container>
    )
  }
}
