import React from 'react';
import { 
  Card, 
  CardContent, 
  Grid, 
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { firebase } from './../../firebaseConfig';
import { snapshotToArray, formattedDate } from './../../Utils';

export default class OrderForm extends React.Component {
  constructor(props){
    super(props);

    const {
      id,
      chosenDeliveryDate,
      chosenCompany,
      chosenProduct,
      quantity,
      price,
      remarks,
      terms,
      urgent,
      assignedTo,
    } = props;

    this.state = {
      companies: [],
      products: [],
      assignees: [],

      chosenDeliveryDate: id ? chosenDeliveryDate : null,
      chosenCompany: id ? chosenCompany : '',
      chosenProduct: id ? chosenProduct : '',
      quantity: id ? quantity : '',
      price: id ? price : '',
      remarks: id ? remarks : '',
      terms: id ? terms : '',
      urgent: id ? urgent : 'false',
      assignedTo: id ? assignedTo : '',
    }

    this._isMounted = false;
  }

  initializer = async () => {
    await firebase.database().ref('companies/').on('value', (snapshot) => {
      const companies = snapshotToArray(snapshot);
      this._isMounted && this.setState({
        companies,
      });
    });

    await firebase.database().ref('products/').on('value', (snapshot) => {
      const products = snapshotToArray(snapshot);
      this._isMounted && this.setState({
        products,
      });
    });

    await firebase.database().ref('assignees/').on('value', (snapshot) => {
      const assignees = snapshotToArray(snapshot);
      this._isMounted && this.setState({
        assignees,
      })
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
    const value = evt.target.value;
    this.setState({ [name]: value });
  }

  handleDateChange = (chosenDeliveryDate) => {
    this.setState({ chosenDeliveryDate: formattedDate(chosenDeliveryDate) });
  }

  handleSubmitPress = (evt) => {
    evt.preventDefault();
    const { onFormSubmit, id } = this.props;
    const {
      chosenDeliveryDate,
      chosenCompany,
      chosenProduct,
      quantity,
      price,
      remarks,
      terms,
      urgent,
      assignedTo,
    } = this.state;

    urgent.toString();

    onFormSubmit({
      id,
      chosenDeliveryDate,
      chosenCompany,
      chosenProduct,
      quantity,
      price,
      remarks,
      terms,
      urgent,
      assignedTo,
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
      chosenDeliveryDate: null,
      quantity: '',
      price: '',
      terms: '',
      remarks: '',
      urgent: 'false',
      assignedTo: ''
    })
  }

  render(){
    const {
      companies,
      products,
      assignees,
      chosenCompany,
      chosenProduct,
      chosenDeliveryDate,
      quantity,
      price,
      terms,
      remarks,
      urgent,
      assignedTo,
    } = this.state;
    const { onFormClose, id } = this.props;

    const submitText = id ? 'Update' : 'Create';
    const urgencies = ['true', 'false'];

    return (
      <div>
      <Card>
        <CardContent>

          <FormControl
          fullWidth
          variant={'outlined'}
          margin={'normal'}
          required
          >
            <InputLabel id={'chosenCompany'}>
              Company
            </InputLabel>
            <Select
              id={'chosenCompany'}
              name={'chosenCompany'}
              value={chosenCompany}
              onChange={this.handleChangeInput}
              labelWidth={60}
            >
            {companies.map( (company) => (
              <MenuItem
              key={company.name}
              value={company.name}
              >
              {company.name}
              </MenuItem>
            ) )}
            </Select>
          </FormControl>

          <FormControl
          fullWidth
          variant={'outlined'}
          margin={'normal'}
          required
          >
            <InputLabel id={'chosenProduct'}>
              Product
            </InputLabel>
            <Select
              id={'chosenProduct'}
              name={'chosenProduct'}
              value={chosenProduct}
              onChange={this.handleChangeInput}
              labelWidth={60}
            >
            {products.map( (product) => (
              <MenuItem
              key={product.name}
              value={product.name}
              >
              {product.name}
              </MenuItem>
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

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              required
              inputVariant={'outlined'}
              format={'yyyy-MM-dd'}
              margin={'normal'}
              id={'chosenDeliveryDate'}
              label="Delivery Date"
              value={chosenDeliveryDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl
          fullWidth
          variant={'outlined'}
          margin={'normal'}
          required
          >
            <InputLabel id={'assignedTo'}>
              Assignee
            </InputLabel>
            <Select
              id={'assignedTo'}
              name={'assignedTo'}
              value={assignedTo}
              onChange={this.handleChangeInput}
              labelWidth={60}
            >
            {assignees.map( (assignee) => (
              <MenuItem
              key={assignee.name}
              value={assignee.name}
              >
              {assignee.name}
              </MenuItem>
            ) )}
            </Select>
          </FormControl>

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

          <FormControl
          fullWidth
          variant={'outlined'}
          margin={'normal'}
          required
          >
            <InputLabel id={'urgent'}>
              Urgent?
            </InputLabel>
            <Select
              id={'urgent'}
              name={'urgent'}
              value={urgent}
              onChange={this.handleChangeInput}
              labelWidth={60}
            >
            {urgencies.map( (urgency) => (
              <MenuItem
              key={urgency}
              value={urgency}
              >
              {urgency}
              </MenuItem>
            ) )}
            </Select>
          </FormControl>

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
      <br />
      </div>
    )
  }
}