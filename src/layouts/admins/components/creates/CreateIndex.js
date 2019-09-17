import React from 'react';
import {
  Container,
  Grid,
  Rail,
  Ref,
  Segment,
  Sticky,
  Button,
  Header,
  Icon,
  Divider,
} from 'semantic-ui-react';

import EditableOrder from './EditableOrder';
import OrderForm from './OrderForm';
import { newOrder } from './../../../../Utils';
import { firebase } from './../../../../firebaseConfig';

export default class CreateIndex extends React.Component {
  state = {
    orders: [],
  }

  handleRemovePress = (orderId) => {
    // alert('Deleting order. Are you sure?');
    const { orders } = this.state;
    const filtered = orders.filter( (order) => order.id !== orderId );

    this.setState({ orders: filtered });
  }

  handleCreateFormSubmit = (order) => {
    const { orders } = this.state;

    if (
      !order.chosenCompany ||
      !order.chosenProduct ||
      !order.chosenDate ||
      !order.quantity ||
      !order.price
    ) {
      alert('Error! Please check your form');
    }else {
      this.setState({
        orders: [newOrder(order), ...orders]
      });
    }
  }

  handleFormSubmit = (attrs) => {
    const { orders } = this.state;

    this.setState({
      orders: orders.map( (order) => {
        if (order.id === attrs.id) {
          const {
            chosenCompany,
            chosenProduct,
            chosenDate,
            quantity,
            price,
            remarks,
            terms,
            urgent,
          } = attrs;

          return {
            ...order,
            chosenCompany,
            chosenProduct,
            chosenDate,
            quantity,
            price,
            remarks,
            terms,
            urgent,
          }
        }

        return order;
      })
    })
  }

  handleSubmitAll = () => {
    const { orders } = this.state;

    if (orders.length === 0) {
      alert('No entries yet.');
      return;
    }

    const currentUser = firebase.auth().currentUser;

    orders.map( (order) => {
      return firebase.database().ref('users/' + currentUser.uid + '/orders/' + order.id).set({
        ...order,
      });
    })

    this.setState({ orders: [] });
  }

  renderOrders = ( order ) => {
    return (
      <EditableOrder
      key={order.id}
      order={order}
      onRemovePress={this.handleRemovePress}
      onFormSubmit={this.handleFormSubmit}
      />
    )
  }

  contextRef = React.createRef();

  render(){
    const { orders } = this.state;

    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <Ref innerRef={this.contextRef}>
              <Segment>
                <Rail position='left'>
                  <Sticky context={this.contextRef} offset={60}>
                    <OrderForm
                    onFormSubmit={this.handleCreateFormSubmit}
                    />
                  </Sticky>
                </Rail>

                <Header as={'h1'} textAlign={'center'}>Waiting for Submission</Header>
                {orders.length === 0 && (
                  <p style={{ textAlign: 'center' }}>No orders yet.</p>
                )}
                {orders.map( (order) => this.renderOrders(order) )}

                {orders.length > 0 && (
                  <Rail position='right'>
                    <Sticky context={this.contextRef} offset={60}>
                      <Segment>
                        <Header as='h5' icon textAlign={'center'}>
                          <Icon name='exclamation' circular />
                          <Header.Content>You have {orders.length} orders waiting for submission</Header.Content>
                        </Header>

                        <Divider />

                        <Button
                        color={'green'}
                        fluid
                        onClick={this.handleSubmitAll}
                        >Submit All</Button>
                      </Segment>
                    </Sticky>
                  </Rail>
                )}
              </Segment>
            </Ref>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
