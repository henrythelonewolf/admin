import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Grow
} from '@material-ui/core';

export default function OrderItem({
  // id,
  chosenCompany,
  chosenProduct,
  chosenDeliveryDate,
  quantity,
  price,
  terms,
  remarks,
  urgent,
  assignedTo,
  totalPrice = price*quantity,

  onEditPress,
}){

  const Field = ({ title, value }) => {
    return (
      <div>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
        <br />
      </div>
    )
  }

  return (
    <div>
    <Grow in={true} timeout={600}>
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <Field title={'ID'} value={id} /> */}
            <Field title={'AssignedTo'} value={assignedTo} />
            <Field title={'Company'} value={chosenCompany} />
            <Field title={'Product'} value={chosenProduct} />
            <Field title={'Quantity'} value={quantity} />
            <Field title={'Unit Price'} value={price} />
          </Grid>
          <Grid item xs={6}>
            <Field title={'Date'} value={chosenDeliveryDate} />
            <Field title={'Terms'} value={terms} />
            <Field title={'Remarks'} value={remarks} />
            <Field title={'Urgent'} value={urgent} />
            <Field title={'Total Price'} value={'RM ' + totalPrice} />
          </Grid>
        </Grid>

        <Button
          onClick={onEditPress}
          variant={'contained'}
          color={'primary'}
          fullWidth
        >
        Edit
        </Button>
      </CardContent>
    </Card>
    </Grow>
    <br />
    </div>
  )
}
