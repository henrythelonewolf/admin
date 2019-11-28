import React, { useState } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import EditableOrder from './EditableOrder';
import OrderForm from './OrderForm';
import PageContainer from './../shared/PageContainer';

import { newOrder } from './../../Utils';
import { firebase } from './../../firebaseConfig';

export default function CreateIndex(){

  const [orders, setOrders] = useState([]);

  const handleRemovePress = (orderId) => {
    // alert('Deleting order. Are you sure?');
    const filtered = orders.filter( (order) => order.id !== orderId );
    setOrders(filtered);
  }

  const handleCreateFormSubmit = (order) => {
    if (
      !order.chosenCompany ||
      !order.chosenProduct ||
      !order.chosenDeliveryDate ||
      !order.quantity ||
      !order.price ||
      !order.assigned_to
    ) {
      alert('Error! Please check your form');
    }else {
      setOrders([newOrder(order), ...orders]);
    }
  }

  const handleFormSubmit = (attrs) => {
    const updatedOrders = orders.map( (order) => {
      // if  existing order do update on changed field
      if (order.id === attrs.id) {
        const {
          chosenCompany,
          chosenProduct,
          chosenDeliveryDate,
          quantity,
          price,
          remarks,
          terms,
          urgent,
          assigned_to,
        } = attrs;

        return {
          ...order,
          chosenCompany,
          chosenProduct,
          chosenDeliveryDate,
          quantity,
          price,
          remarks,
          terms,
          urgent,
          assigned_to,
        }
      }

      // else return as it is
      return order;
    });

    setOrders(updatedOrders);
  }

  const handleSubmitAll = () => {
    if (orders.length === 0) {
      alert('Error! No entries.');
      return;
    }

    orders.map( async (order) => {
      // change urgent boolean value to string
      const modOrder = {
        ...order,
        urgent: order.urgent === true ? 'true' : 'false'
      }
      // send to firebase
      return await firebase.database().ref('orders/' + order.id).set(modOrder);
    });

    setOrders([]);
  }

  const renderOrders = ( order ) => {
    return (
      <EditableOrder
        key={order.id}
        order={order}
        onRemovePress={handleRemovePress}
        onFormSubmit={handleFormSubmit}
      />
    )
  }

  return (
    <PageContainer name={'Create Order'}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <OrderForm
          onFormSubmit={handleCreateFormSubmit}
          />
        </Grid>
        <Grid item xs={6}>
          {orders.length === 0 && (
            <p style={{ textAlign: 'center' }}>No orders yet.</p>
          )}

          {orders.map( (order) => renderOrders(order) )}
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
                  onClick={handleSubmitAll}
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
