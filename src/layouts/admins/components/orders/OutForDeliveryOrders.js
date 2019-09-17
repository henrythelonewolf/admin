import React from 'react';
import { Tab } from 'semantic-ui-react';

import { firebase } from './../../../../firebaseConfig';
import { getCurrentUser, snapshotToArray } from './../../../../Utils';
import store from './../../../../store';

export default class PendingOrders extends React.Component {
  constructor(props){
    super(props);

    this.state = {
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
      const filteredOrdered = snapshotToArray(snapshot).filter( (order) => order.status === 'Out For Delivery');

      const createTabItem = (tabItem) => {
        const item = {
          menuItem: tabItem.id,
          render: () => this.innerPane(tabItem),
        }
        return item;
      }

      let tabItems = [];
      filteredOrdered.map( (ordered) => {
        return tabItems.push(createTabItem(ordered));
      });

      if (tabItems === null || tabItems.length === 0) {
        this._isMounted && this.setState({
          tabItems: [],
          isEmpty: true,
          loading: false,
        });
      } else {
        this._isMounted && this.setState({
          tabItems,
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
        <h2 className="ui header">
          <div className="sub header">Status</div>
          {data.status}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Company</div>
          {data.chosenCompany}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Product</div>
          {data.chosenProduct}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Date</div>
          {data.chosenDate}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Quantity</div>
          {data.quantity}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Price</div>
          {data.price}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Terms</div>
          {data.terms}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Remarks</div>
          {data.remarks}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Urgent</div>
          {data.urgent ? 'Yes' : 'No'}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Created at</div>
          {data.created_at}
        </h2>

        <h2 className="ui header">
          <div className="sub header">Updated at</div>
          {data.updated_at}
        </h2>
      </Tab.Pane>
    )
  }

  render(){
    const { tabItems, loading, isEmpty } = this.state;

    return (
      <Tab.Pane loading={loading ? true : false}>
      {!isEmpty && (
        <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={tabItems}
        />
      )}

      {isEmpty && (
        <p style={{ textAlign: 'center', height: 200, paddingTop: 90 }}>No orders yet</p>
      )}
      </Tab.Pane>
    )
  }
}
