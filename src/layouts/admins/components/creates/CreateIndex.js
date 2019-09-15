import React from 'react';
import {
  Container,
  Grid,
  Rail,
  Ref,
  Segment,
  Sticky,
} from 'semantic-ui-react';

import OrderForm from './OrderForm';
import OrderItem from './OrderItem';

export default class CreateIndex extends React.Component {
  state = {
    orders: [
      {
        id: 1,
        chosenCompany: 'title',
        chosenProduct: 'desc',
        chosenDate: '',
        quantity: '',
        price: '',
        terms: '',
        remarks: '',
        urgent: false,
      },
      {
        id: 2,
        chosenCompany: 'title',
        chosenProduct: 'desc',
        chosenDate: '',
        quantity: '',
        price: '',
        terms: '',
        remarks: '',
        urgent: false,
      },
      {
        id: 3,
        chosenCompany: 'title',
        chosenProduct: 'desc',
        chosenDate: '',
        quantity: '',
        price: '',
        terms: '',
        remarks: '',
        urgent: false,
      },
      {
        id: 4,
        chosenCompany: 'title',
        chosenProduct: 'desc',
        chosenDate: '',
        quantity: '',
        price: '',
        terms: '',
        remarks: '',
        urgent: false,
      },
      {
        id: 5,
        chosenCompany: 'title',
        chosenProduct: 'desc',
        chosenDate: '',
        quantity: '',
        price: '',
        terms: '',
        remarks: '',
        urgent: false,
      },
    ]
  }

  renderOrders = ( order ) => {
    const {
      chosenCompany,
      chosenProduct,
      chosenDate,
      quantity,
      price,
      terms,
      remarks,
      urgent,
    } = order;

    return (
      <OrderItem
      chosenCompany={chosenCompany}
      chosenProduct={chosenProduct}
      chosenDate={chosenDate}
      quantity={quantity}
      price={price}
      terms={terms}
      remarks={remarks}
      urgent={urgent}
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
              {orders.map( (order) => this.renderOrders(order) )}

              <Rail position='left'>
                <Sticky context={this.contextRef} offset={60}>
                  <OrderForm />
                </Sticky>
              </Rail>

              </Segment>
            </Ref>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
