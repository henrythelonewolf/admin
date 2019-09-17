import React from 'react';

import OrderForm from './OrderForm';
import OrderItem from './OrderItem';

export default class EditableOrder extends React.Component {
  state = {
    isOpen: false,
  }

  handleOnPress = () => {
    this.setState({ isOpen: true });
  }

  handleFormClose = () => {
    this.setState({ isOpen: false });
  }

  handleSubmit = (order) => {
    const { onFormSubmit } = this.props;

    if (
      !order.chosenCompany ||
      !order.chosenProduct ||
      !order.chosenDate ||
      !order.quantity ||
      !order.price
    ) {
      alert('Error! Please check your form')
    } else {
      onFormSubmit(order);
      this.setState({ isOpen: false });
    }
  }

  render(){
    const { isOpen } = this.state;
    const {
      order: {
        id,
        chosenCompany,
        chosenProduct,
        chosenDate,
        quantity,
        price,
        terms,
        remarks,
        urgent,
      },
      onRemovePress,
    } = this.props;

    if (isOpen) {
      return <OrderForm
      id={id}
      chosenCompany={chosenCompany}
      chosenProduct={chosenProduct}
      chosenDate={chosenDate}
      quantity={quantity}
      price={price}
      terms={terms}
      remarks={remarks}
      urgent={urgent}
      onFormClose={this.handleFormClose}
      onRemovePress={onRemovePress}
      onFormSubmit={this.handleSubmit}
      />
    } else {
      return <OrderItem
      id={id}
      chosenCompany={chosenCompany}
      chosenProduct={chosenProduct}
      chosenDate={chosenDate}
      quantity={quantity}
      price={price}
      terms={terms}
      remarks={remarks}
      urgent={urgent}
      onPress={this.handleOnPress}
      onRemovePress={onRemovePress}
      />
    }
  }
}
