import React from 'react';
import { Card } from 'semantic-ui-react';

export default class OrderItem extends React.Component {
  render(){
    const {
      chosenCompany,
      chosenProduct,
      chosenDate,
      quantity,
      price,
      terms,
      remarks,
      urgent,
    } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Meta content={'Company'} />
          <Card.Header content={chosenCompany} />
          <br />
          <Card.Meta content={'Product'} />
          <Card.Header content={chosenProduct} />
          <br />
          <Card.Meta content={'Quantity'} />
          <Card.Header content={quantity} />
          <br />
          <Card.Meta content={'Unit price'} />
          <Card.Header content={price} />
          <br />
          <Card.Meta content={'Date'} />
          <Card.Header content={chosenDate} />
          <br />
          <Card.Meta content={'Terms'} />
          <Card.Header content={terms} />
          <br />
          <Card.Meta content={'Remarks'} />
          <Card.Header content={remarks} />
          <br />
          <Card.Meta content={'Urgent'} />
          <Card.Header content={urgent ? 'Yes' : 'No'} />
        </Card.Content>
      </Card>
    )
  }
}
