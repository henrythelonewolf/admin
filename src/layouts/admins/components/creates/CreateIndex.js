import React from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core';

import EditableOrder from './EditableOrder';
import OrderForm from './OrderForm';
import { newOrder } from './../../../../Utils';
import { firebase } from './../../../../firebaseConfig';

import PageContainer from './../shared/PageContainer';

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
            urgency,
            histories,
            assigned_to,
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
            urgency,
            histories,
            assigned_to,
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

    orders.map( (order) => {
      return firebase.database().ref('orders/' + order.id).set({
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
      <PageContainer name={'Create Order'}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <OrderForm
            onFormSubmit={this.handleCreateFormSubmit}
            />
          </Grid>
          <Grid item xs={6}>
            {orders.length === 0 && (
              <p style={{ textAlign: 'center' }}>No orders yet.</p>
            )}

            {orders.map( (order) => this.renderOrders(order) )}
          </Grid>
          <Grid item xs={3}>
            {orders.length > 0 && (
              <Card>
                <CardContent>
                You have {orders.length} orders waiting for submission
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    onClick={this.handleSubmitAll}
                  >
                  Submit All
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </PageContainer>
    )
  }
}
