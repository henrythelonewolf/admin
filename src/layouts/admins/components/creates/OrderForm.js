import React from 'react';
import {
  Card,
  Form,
  Button,
  Grid,
  Divider
} from 'semantic-ui-react';
import { firebase } from './../../../../firebaseConfig';

export default class OrderForm extends React.Component {
  constructor(props){
    super(props);

    const {
      id,
      chosenDate,
      chosenCompany,
      chosenProduct,
      quantity,
      price,
      remarks,
      terms,
      status,
      created_at,
      urgent,
    } = props;

    this.state = {
      companies: [],
      products: [],

      chosenDate: id ? chosenDate : '',
      chosenCompany: id ? chosenCompany : '',
      chosenProduct: id ? chosenProduct : '',
      quantity: id ? quantity : '',
      price: id ? price : '',
      remarks: id ? remarks : '',
      terms: id ? terms : '',
      status: id ? status : 'Pending',
      created_at: id ? created_at : '',
      urgent: id ? urgent : false,
    }

    this._isMounted = false;
  }

  initializer = async () => {

    function createArray(snapshot){
      var itemArr = [];

      snapshot.forEach( (child) => {
        var item = {};
        item.key = child.key;
        item.text = child.val().title;
        item.value = child.val().title;

        itemArr.push(item);
      })

      return itemArr;
    }

    await firebase.database().ref('companies/').on('value', (snapshot) => {
      const companies = createArray(snapshot);
      this._isMounted && this.setState({
        companies,
      });
    });

    await firebase.database().ref('products/').on('value', (snapshot) => {
      const products = createArray(snapshot);
      this._isMounted && this.setState({
        products,
      });
    });
  }

  componentDidMount(){
    this._isMounted = true;
    this._isMounted && this.initializer();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleChangeInput = (evt) => {
    const name = evt.target.name;
    const value = (evt.target.type === 'checkbox')
    ? evt.target.checked
    : evt.target.value;

    this.setState({ [name]: value });
  }

  handleSelectCompany = (evt) => {
    const value = evt.target.firstChild.textContent;
    this.setState({ chosenCompany: value });
  }

  handleSelectProduct = (evt) => {
    const value = evt.target.firstChild.textContent;
    this.setState({ chosenProduct: value });
  }

  handleSubmitPress = (evt) => {
    evt.preventDefault();
    const { onFormSubmit, id } = this.props;
    const {
      chosenDate,
      chosenCompany,
      chosenProduct,
      quantity,
      price,
      remarks,
      terms,
      status,
      created_at,
      urgent,
    } = this.state;

    onFormSubmit({
      id,
      chosenDate,
      chosenCompany,
      chosenProduct,
      quantity,
      price,
      remarks,
      terms,
      status,
      created_at,
      urgent,
    })
  }

  handleRemovePress = () => {
    const { id, onRemovePress } = this.props;
    onRemovePress(id);
  }

  handleClearPress = () => {
    this.setState({
      chosenCompany: '',
      chosenProduct: '',
      chosenDate: '',
      quantity: '',
      price: '',
      terms: '',
      remarks: '',
      urgent: false,
    })
  }

  render(){
    const {
      companies,
      products,
      chosenCompany,
      chosenProduct,
      chosenDate,
      quantity,
      price,
      terms,
      remarks,
      urgent,
    } = this.state;
    const { onFormClose, id } = this.props;

    const submitText = id ? 'Update' : 'Create';

    return (
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Select
              label={'Company'}
              options={companies}
              placeholder={'Choose company'}
              value={chosenCompany}
              onChange={this.handleSelectCompany}
              required
            />
            <Form.Select
              label={'Product'}
              options={products}
              placeholder={'Choose product'}
              value={chosenProduct}
              onChange={this.handleSelectProduct}
              required
            />
            <Form.Input
              label={'Quantity'}
              placeholder={'Quantity'}
              name={'quantity'}
              value={quantity}
              onChange={this.handleChangeInput}
              required
            />
            <Form.Input
              label={'Price'}
              placeholder={'Unit price'}
              name={'price'}
              value={price}
              onChange={this.handleChangeInput}
              required
            />
            <Form.Input
              label={'Date'}
              placeholder={'Date'}
              name={'chosenDate'}
              value={chosenDate}
              onChange={this.handleChangeInput}
              required
            />
            <Form.Input
              label={'Terms'}
              placeholder={'Terms'}
              name={'terms'}
              value={terms}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              label={'Remarks'}
              placeholder={'Remarks'}
              name={'remarks'}
              value={remarks}
              onChange={this.handleChangeInput}
            />

            <div className="field">
              <div className="ui checkbox">
                <input
                id={id ? id : 'checkbox'}
                name={'urgent'}
                type="checkbox"
                onChange={this.handleChangeInput}
                checked={urgent}
                />
                <label htmlFor={id ? id : 'checkbox'}>Urgent</label>
              </div>
            </div>

            {id && (
              <>
              <Divider />
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Button
                    fluid
                    color={'red'}
                    onClick={this.handleRemovePress}>Remove</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                    fluid
                    onClick={onFormClose}>Cancel</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              </>
            )}

            <Divider />

            <Button
            type={'submit'}
            fluid
            primary
            onClick={this.handleSubmitPress}
            >{submitText}</Button>

            {!id && (
              <>
                <Divider />

                <Button
                fluid
                onClick={this.handleClearPress}
                >Clear</Button>
              </>
            )}

          </Form>
        </Card.Content>
      </Card>
    )
  }
}
