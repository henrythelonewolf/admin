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
      !order.chosenDeliveryDate ||
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
        chosenDeliveryDate,
        quantity,
        price,
        terms,
        remarks,
        urgency,
        assigned_to,
      },
      onRemovePress,
    } = this.props;

    if (isOpen) {
      return <OrderForm
      id={id}
      chosenCompany={chosenCompany}
      chosenProduct={chosenProduct}
      chosenDeliveryDate={chosenDeliveryDate}
      quantity={quantity}
      price={price}
      terms={terms}
      remarks={remarks}
      urgency={urgency}
      assigned_to={assigned_to}
      onFormClose={this.handleFormClose}
      onRemovePress={onRemovePress}
      onFormSubmit={this.handleSubmit}
      />
    } else {
      return <OrderItem
      id={id}
      chosenCompany={chosenCompany}
      chosenProduct={chosenProduct}
      chosenDeliveryDate={chosenDeliveryDate}
      quantity={quantity}
      price={price}
      terms={terms}
      remarks={remarks}
      urgency={urgency}
      assigned_to={assigned_to}
      onPress={this.handleOnPress}
      onRemovePress={onRemovePress}
      />
    }
  }
}
