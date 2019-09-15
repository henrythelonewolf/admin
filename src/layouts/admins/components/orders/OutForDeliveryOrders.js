import React from 'react';
import { Tab } from 'semantic-ui-react';

export default class OutForDeliveryOrders extends React.Component {
  render(){
    const outForDeliveryItems = [
      { menuItem: 'insider', render: () => <Tab.Pane>hi</Tab.Pane> },
      { menuItem: 'insider', render: () => <Tab.Pane>hi</Tab.Pane> }
    ];

    return (
      <Tab.Pane>
        <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={outForDeliveryItems}
        />
      </Tab.Pane>
    )
  }
}
