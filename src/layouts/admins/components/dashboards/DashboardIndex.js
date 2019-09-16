import React from 'react';
import { Container } from 'semantic-ui-react';
import Stats from './Stats';
import store from './../../../../store';

export default class DashboardIndex extends React.Component {
  componentDidMount(){
    console.log(store.getState().currentUser);
  }

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
