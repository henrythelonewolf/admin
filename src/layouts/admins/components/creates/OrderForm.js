import React from 'react';
import { Card, Form, Button } from 'semantic-ui-react';

export default class OrderForm extends React.Component {
  state = {
    companies: [
      { key: '1', text: 'Company A', value: 'Company A' },
      { key: '2', text: 'Company B', value: 'Company B' },
      { key: '3', text: 'Company C', value: 'Company C' },
      { key: '4', text: 'Company D', value: 'Company D' },
    ],
    products: [
      { key: '1', text: 'Product A', value: 'Product A' },
      { key: '2', text: 'Product B', value: 'Product B' },
      { key: '3', text: 'Product C', value: 'Product C' },
      { key: '4', text: 'Product D', value: 'Product D' },
    ],
  }

  render(){
    const { companies, products } = this.state;

    return (
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Select
            error={{ content: 'Please select company', pointing: 'below'}}
            options={companies}
            placeholder={'Choose company'}
            />
            <Form.Select
            error={{ content: 'Please select product', pointing: 'below'}}
            options={products}
            placeholder={'Choose product'}
            />
            <Form.Input
            error={{ content: 'Please enter quantity', pointing: 'below'}}
            placeholder={'Quantity'}
            />
            <Form.Input
            error={{ content: 'Please enter unit price', pointing: 'below'}}
            placeholder={'Unit price'}
            />
            <Form.Input
            error={{ content: 'Please choose date', pointing: 'below'}}
            placeholder={'Date'}
            />
            <Form.Input
            placeholder={'Terms'}
            />
            <Form.Input
            placeholder={'Remarks'}
            />
            <Form.Checkbox
            label={'Urgent'}
            />
            <Button
            type={'submit'}
            fluid
            color={'green'}
            >Create</Button>
          </Form>
        </Card.Content>
      </Card>
    )
  }
}
