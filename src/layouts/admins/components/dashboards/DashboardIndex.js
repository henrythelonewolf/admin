import React from 'react';
import { Container, Statistic } from 'semantic-ui-react';

export default class DashboardIndex extends React.Component {
  state = {
    statItems: [
      { key: '1', label: 'Pending', value: '5000' },
      { key: '2', label: 'Processed', value: '5000' },
      { key: '3', label: 'Out For Delivery', value: '5000' },
      { key: '4', label: 'On-Hold', value: '5000' },
    ]
  }

  render(){
    const { statItems } = this.state;

    return (
      <Container>
        <Statistic.Group widths={'four'} items={statItems} />
      </Container>
    )
  }
}
