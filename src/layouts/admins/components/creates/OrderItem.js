import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid
} from '@material-ui/core';

export default function OrderItem({
  id,
  chosenCompany,
  chosenProduct,
  chosenDate,
  quantity,
  price,
  terms,
  remarks,
  urgent,
  onPress,
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
            <Field title={'Date'} value={chosenDate} />
            <Field title={'Terms'} value={terms} />
            <Field title={'Remarks'} value={remarks} />
            <Field title={'Urgent'} value={urgent ? 'Yes' : 'No'} />
          </Grid>
        </Grid>

        <Button
          onClick={onPress}
          variant={'contained'}
          color={'primary'}
          fullWidth
        >
        Edit
        </Button>
      </CardContent>
    </Card>
    <br />
    </div>
  )
}
