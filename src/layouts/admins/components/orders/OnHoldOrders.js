import React from 'react';
import { Tab } from 'semantic-ui-react';

export default class OnHoldOrders extends React.Component {
  render(){
    const onHoldItems = [
      { menuItem: 'insider', render: () => <Tab.Pane>hi</Tab.Pane> },
      { menuItem: 'insider', render: () => <Tab.Pane>hi</Tab.Pane> }
    ];

    return (
      <Tab.Pane>
        <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={onHoldItems}
        />
      </Tab.Pane>
    )
  }
}
