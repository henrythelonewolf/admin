import React from 'react';
import { Tab } from 'semantic-ui-react';

import { firebase } from './../../../../firebaseConfig';
import store from './../../../../store';
import { getCurrentUser, snapshotToArray } from './../../../../Utils';

export default class PendingOrders extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pendingOrdered: [],
      tabItems: [],

      isEmpty: true,
      loading: false,
    };

    // for cancel subscription or asyncronous task in componentDidMount
    this._isMounted = false;
  }

  initializer = async () => {
    getCurrentUser();
    const currentUser = store.getState().currentUser;
    // uncomment below if in production
    this.setState({ loading: true });
    await firebase
    .database()
    .ref('users/' + currentUser.uid + '/orders/')
    .on('value', (snapshot) => {
      const pendingOrdered = snapshotToArray(snapshot).filter( (order) => order.status === 'Pending');

      const createTabItem = (tabItem) => {
        const item = {
          menuItem: tabItem.id,
          render: () => this.innerPane(tabItem),
        }
        return item;
      }

      let tabItems = [];
      pendingOrdered.map( (ordered) => {
        tabItems.push(createTabItem(ordered));
      });
      this.setState({ tabItems });

      if (pendingOrdered === null || pendingOrdered.length === 0) {
        this._isMounted && this.setState({
          pendingOrdered: [],
          isEmpty: true,
          loading: false,
        });
      } else {
        this._isMounted && this.setState({
          pendingOrdered,
          isEmpty: false,
          loading: false,
        })
      }
    })
  }

  componentDidMount(){
    this._isMounted = true;
    this._isMounted && this.initializer();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  innerPane = (data) => {
    return (
      <Tab.Pane>
        <h2 class="ui header">
          <div class="sub header">Company</div>
          {data.chosenCompany}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Product</div>
          {data.chosenProduct}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Date</div>
          {data.chosenDate}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Quantity</div>
          {data.quantity}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Price</div>
          {data.price}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Terms</div>
          {data.terms}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Remarks</div>
          {data.remarks}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Urgent</div>
          {data.urgent ? 'Yes' : 'No'}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Created at</div>
          {data.created_at}
        </h2>

        <h2 class="ui header">
          <div class="sub header">Updated at</div>
          {data.updated_at}
        </h2>
      </Tab.Pane>
    )
  }

  render(){
    const { tabItems } = this.state;

    return (
      <Tab.Pane>
        <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={tabItems}
        />
      </Tab.Pane>
    )
  }
}
