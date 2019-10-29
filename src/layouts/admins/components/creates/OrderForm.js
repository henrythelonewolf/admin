import React from 'react';
import { Card, CardContent, Grid, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
      <Card>
        <CardContent>

          <FormControl fullWidth variant={'outlined'} margin={'normal'}>
            <InputLabel id={'chosenCompany'}>
              Company
            </InputLabel>
            <Select
              labelId={'chosenCompany'}
              id={'chosenCompany'}
              name={'chosenCompany'}
              value={chosenCompany}
              onChange={this.handleChangeInput}
              labelWidth={60}
            >
            {companies.map( (company) => (
              <MenuItem value={company.value}>{company.text}</MenuItem>
            ) )}
            </Select>
          </FormControl>

          <FormControl fullWidth variant={'outlined'} margin={'normal'}>
            <InputLabel id={'chosenProduct'}>
              Product
            </InputLabel>
            <Select
              labelId={'chosenProduct'}
              id={'chosenProduct'}
              name={'chosenProduct'}
              value={chosenProduct}
              onChange={this.handleChangeInput}
              labelWidth={60}
            >
            {products.map( (product) => (
              <MenuItem value={product.value}>{product.text}</MenuItem>
            ) )}
            </Select>
          </FormControl>

          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            id={'quantity'}
            label={'Quantity'}
            name={'quantity'}
            onChange={this.handleChangeInput}
            value={quantity}
          />

          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            id={'price'}
            label={'Price'}
            name={'price'}
            onChange={this.handleChangeInput}
            value={price}
          />

          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            id={'date'}
            label={'Date'}
            name={'chosenDate'}
            onChange={this.handleChangeInput}
            value={chosenDate}
          />

          <TextField
            variant={'outlined'}
            margin={'normal'}
            fullWidth
            id={'terms'}
            label={'Terms'}
            name={'terms'}
            onChange={this.handleChangeInput}
            value={terms}
          />

          <TextField
            variant={'outlined'}
            margin={'normal'}
            fullWidth
            id={'remarks'}
            label={'Remarks'}
            name={'remarks'}
            onChange={this.handleChangeInput}
            value={remarks}
          />

          <FormControlLabel
            control={
              <Switch
                checked={urgent}
                onChange={this.handleChangeInput}
                name={'urgent'}
                color={'primary'}
              />
            }
            label={'Urgent?'}
          />

          <br />

          {id && (
            <div>
            <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                  fullWidth
                  color={'secondary'}
                  variant={'contained'}
                  onClick={this.handleRemovePress}
                  >
                  Remove
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                  fullWidth
                  variant={'contained'}
                  onClick={onFormClose}
                  >
                  Cancel
                  </Button>
                </Grid>
              </Grid>
              </div>
            )}

            <br />

            <Button
            fullWidth
            variant={'contained'}
            color={'primary'}
            onClick={this.handleSubmitPress}
            >{submitText}</Button>

            {!id && (
              <div>
              <br />
              <Button
              fullWidth
              variant={'contained'}
              onClick={this.handleClearPress}
              >Clear</Button>
              </div>
            )}

        </CardContent>
      </Card>
    )
  }
}
