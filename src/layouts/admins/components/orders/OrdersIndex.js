import React from 'react';
import { Container, Tab } from 'semantic-ui-react';

import PendingOrders from './PendingOrders';
import ProcessedOrders from './ProcessedOrders';
import OutForDeliveryOrders from './OutForDeliveryOrders';
import OnHoldOrders from './OnHoldOrders';

export default class BoilerPlate extends React.Component {
  mainPanes = [
      { menuItem: 'Pending Orders', render: () => <PendingOrders /> },
      { menuItem: 'Processed Orders', render: () => <ProcessedOrders /> },
      { menuItem: 'Out For Delivery Orders', render: () => <OutForDeliveryOrders /> },
      { menuItem: 'On-Hold Orders', render: () => <OnHoldOrders /> },
  ]

  render(){
    return (
      <Container>
        <Tab panes={this.mainPanes} />
      </Container>
    )
  }
}
