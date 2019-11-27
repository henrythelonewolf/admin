import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { formattedDate, snapshotToArray } from './../../../Utils';
import { firebase } from './../../../firebaseConfig';

export default function DialogUpdate({
    selections,
    openStatus,
    onSubmit,
    onCancel,
}){
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const initializer = async () => {

    await firebase.database().ref('companies/').on('value', (snapshot) => {
      const companies = snapshotToArray(snapshot);
      setCompanies(companies);
    });

    await firebase.database().ref('products/').on('value', (snapshot) => {
      const products = snapshotToArray(snapshot);
      setProducts(products);
    });

    await firebase.database().ref('assignees/').on('value', (snapshot) => {
      const assignees = snapshotToArray(snapshot);
      setAssignees(assignees);
    });
  }

  useEffect( () => {
    initializer();
  }, []);

  const statuses = ['Pending', 'Processing', 'Out-For-Delivery', 'On-Hold'];

  const [chosenCompany, setChosenCompany] = useState('');
  const [chosenProduct, setChosenProduct] = useState('')
  const [chosenDeliveryDate, setChosenDeliveryDate] = useState(null);
  const [price, setPrice] = useState('');
  const [terms, setTerms] = useState('');
  const [remarks, setRemarks] = useState('');
  const [quantity, setQuantity] = useState('');
  const [assigned_to, setAssignedTo] = useState('');
  const [urgent, setUrgent] = useState(null);
  const [status, setStatus] = useState('');

  const getValue = (event) => event.target.value;

  const handleChosenCompany = (event) => {
    setChosenCompany(getValue(event));
  }
  const handleChosenProduct = (event) => {
    setChosenProduct(getValue(event));
  }
  const handleQuantity = (event) => {
    setQuantity(getValue(event));
  }
  const handlePrice = (event) => {
    setPrice(getValue(event));
  }
  const handleTerms = (event) => {
    setTerms(getValue(event));
  }
  const handleRemarks = (event) => {
    setRemarks(getValue(event));
  }
  const handleAssignedTo = (event) => {
    setAssignedTo(getValue(event));
  }
  const handleUrgent = (event) => {
    setUrgent(event.target.checked);
  }
  const handleDateChange = (chosenDeliveryDate) => {
    setChosenDeliveryDate(formattedDate(chosenDeliveryDate));
  }
  const handleStatus = (event) => {
    setStatus(getValue(event));
  }

  const handleOnClear = () => {
    setChosenCompany('');
    setChosenProduct('');
    setChosenDeliveryDate(null);
    setPrice('');
    setTerms('');
    setRemarks('');
    setQuantity('');
    setAssignedTo('');
    setUrgent(null);
    setStatus('');
  }

  const handleOnSubmitUpdate = (event) => {
    event.preventDefault();

    // const fields = [
    //   chosenCompany,
    //   chosenProduct,
    //   chosenDeliveryDate,
    //   price,
    //   terms,
    //   remarks,
    //   quantity,
    //   assigned_to,
    //   urgent,
    //   status,
    // ];
    //
    // const updates = fields.reduce(
    //   (accumulator, field) => {
    //     if (field !== (null || '')) {
    //       accumulator.push(field);
    //     }
    //     return accumulator;
    //   },
    // );
    // console.log(updates);

    const updates = {
      status,
      type: 'Open',
    }
    // console.log(updates);
    // firebase update code here
    selections.map(
      async (selection) => {
        return await firebase.database().ref('orders/' + selection).update(updates)
      }
    )

    handleOnClear();
    onSubmit();
  }

  const handleOnCancel = () => {
    handleOnClear();
    onCancel();
  }

  return (
      <Dialog
        open={openStatus}
        onClose={handleOnClear}
        aria-labelledby={'massUpdate'}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id={'massUpdate'}>Mass Update</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item lg={6}>
              <DialogContentText>
                  Updating ticket ID:
                  <br />
                  {selections.map( (id) => (
                    <Chip key={id} label={id} style={{ margin: 5 }} />
                  ) )}
              </DialogContentText>
            </Grid>
            <Grid item lg={6}>
            <FormControl
        fullWidth
        variant={'outlined'}
        margin={'normal'}
        >
          <InputLabel id={'chosenCompany'}>
            Company
          </InputLabel>
          <Select
            id={'chosenCompany'}
            name={'chosenCompany'}
            value={chosenCompany}
            onChange={handleChosenCompany}
            labelWidth={60}
          >
          <MenuItem
          key={'nullCompany'}
          value={''}
          >
          Please choose company
          </MenuItem>

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
        >
          <InputLabel id={'chosenProduct'}>
            Product
          </InputLabel>
          <Select
            id={'chosenProduct'}
            name={'chosenProduct'}
            value={chosenProduct}
            onChange={handleChosenProduct}
            labelWidth={60}
          >
          <MenuItem
          key={'nullProduct'}
          value={''}
          >
          Please choose product
          </MenuItem>

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
          fullWidth
          id={'quantity'}
          label={'Quantity'}
          name={'quantity'}
          onChange={handleQuantity}
          value={quantity}
        />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            inputVariant={'outlined'}
            format={'yyyy-MM-dd'}
            margin={'normal'}
            id={'chosenDeliveryDate'}
            label={'Delivery Date'}
            value={chosenDeliveryDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControl
        fullWidth
        variant={'outlined'}
        margin={'normal'}
        >
          <InputLabel id={'assigned_to'}>
            Assignee
          </InputLabel>
          <Select
            id={'assigned_to'}
            name={'assigned_to'}
            value={assigned_to}
            onChange={handleAssignedTo}
            labelWidth={60}
          >
          <MenuItem
          key={'nullAssignee'}
          value={''}
          >
          Please choose assignee
          </MenuItem>
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
          id={'price'}
          label={'Price'}
          name={'price'}
          onChange={handlePrice}
          value={price}
        />

          <TextField
          variant={'outlined'}
          margin={'normal'}
          fullWidth
          id={'terms'}
          label={'Terms'}
          name={'terms'}
          onChange={handleTerms}
          value={terms}
        />

        <TextField
          variant={'outlined'}
          margin={'normal'}
          fullWidth
          id={'remarks'}
          label={'Remarks'}
          name={'remarks'}
          onChange={handleRemarks}
          value={remarks}
        />

        <FormControl
        fullWidth
        variant={'outlined'}
        margin={'normal'}
        >
          <InputLabel id={'status'}>
            Status
          </InputLabel>
          <Select
            id={'status'}
            name={'status'}
            value={status}
            onChange={handleStatus}
            labelWidth={60}
          >
          <MenuItem
          key={'nullStatus'}
          value={''}
          >
          Please choose status
          </MenuItem>
          {statuses.map( (status) => (
            <MenuItem
            key={status}
            value={status}
            >
            {status}
            </MenuItem>
          ) )}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={urgent}
              onChange={handleUrgent}
              name={'urgent'}
              color={'primary'}
            />
          }
          label={'Urgent?'}
        />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnSubmitUpdate} color="primary">
            Mass Update
          </Button>
          <Button onClick={handleOnClear} color="primary">
            Clear
          </Button>
          <Button onClick={handleOnCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
}
