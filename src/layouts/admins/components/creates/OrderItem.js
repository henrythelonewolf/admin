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
  id,
  chosenCompany,
  chosenProduct,
  chosenDeliveryDate,
  quantity,
  price,
  terms,
  remarks,
  urgent,
  assigned_to,

  onEditPress,
}){

  const Field = ({ title, value }) => {
    return (
      <div>
        <Typography color="textSecondary" gutterBottom>
          {title.toString()}
        </Typography>
        <Typography variant="h5" component="h2">
          {value.toString()}
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
            <Field title={'ID'} value={id} />
            <Field title={'Company'} value={chosenCompany} />
            <Field title={'Product'} value={chosenProduct} />
            <Field title={'Quantity'} value={quantity} />
            <Field title={'Unit price'} value={price} />
          </Grid>
          <Grid item xs={6}>
            <Field title={'Date'} value={chosenDeliveryDate} />
            <Field title={'Terms'} value={terms} />
            <Field title={'Remarks'} value={remarks} />
            <Field title={'Urgent'} value={urgent} />
            <Field title={'assigned_to'} value={assigned_to} />
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