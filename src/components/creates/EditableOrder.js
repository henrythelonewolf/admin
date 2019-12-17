import React, { useState } from 'react';

import OrderForm from './OrderForm';
import OrderItem from './OrderItem';

export default function EditableOrder({
  order: {
    id,
    chosenCompany,
    chosenProduct,
    chosenDeliveryDate,
    quantity,
    price,
    terms,
    remarks,
    urgent,
    assignedTo,
  },
  onRemovePress,
  onFormSubmit,
}){

  const [isOpen, setIsOpen] = useState(false);

  const handleOnEditPress = () => {
    setIsOpen(true);
  }

  const handleFormClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = (order) => {
    onFormSubmit(order);
    setIsOpen(false);
  }

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
      urgent={urgent}
      assignedTo={assignedTo}
      
      onFormClose={handleFormClose}
      onRemovePress={onRemovePress}
      onFormSubmit={handleSubmit}
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
      urgent={urgent}
      assignedTo={assignedTo}
      
      onEditPress={handleOnEditPress}
    />
  }
}