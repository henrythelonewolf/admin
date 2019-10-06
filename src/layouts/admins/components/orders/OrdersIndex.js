import React from 'react';
import { Container, Tab, Button } from 'semantic-ui-react';

import PendingOrders from './PendingOrders';
import ProcessedOrders from './ProcessedOrders';
import OutForDeliveryOrders from './OutForDeliveryOrders';
import OnHoldOrders from './OnHoldOrders';

import ListsIndex from './../lists/ListsIndex';

export default class BoilerPlate extends React.Component {
  mainPanes = [
      { menuItem: 'Pending Orders', render: () => <PendingOrders /> },
      { menuItem: 'Processed Orders', render: () => <ProcessedOrders /> },
      { menuItem: 'Out For Delivery Orders', render: () => <OutForDeliveryOrders /> },
      { menuItem: 'On-Hold Orders', render: () => <OnHoldOrders /> },
  ]

  state = {
    toggleView: false
  }

  render(){
    const { toggleView } = this.state;

    return (
      <Container>
      {!toggleView && (
        <>
        <Button onClick={ () => this.setState({ toggleView: !toggleView})}>
        List View
        </Button>
        <Tab panes={this.mainPanes} />
        </>
      )}

      {toggleView && (
        <>
        <Button onClick={ () => this.setState({ toggleView: !toggleView})}>
        Individual View
        </Button>
        <ListsIndex />
        </>
      )}
      </Container>
    )
  }
}
