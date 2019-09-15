import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import OrderForm from './OrderForm';
import OrderItem from './OrderItem';

export default class EditableOrder extends React.Component {
  state = {
    isEdit: false,
  }

  render(){
    if (isEdit) {
      <OrderForm />
    } else {
      <OrderItem />
    }
  }
}
