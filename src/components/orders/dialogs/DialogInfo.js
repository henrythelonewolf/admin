import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    Typography,
} from '@material-ui/core';

export default function DialogInfo({
    data: {
        id,
        chosenCompany,
        chosenProduct,
        chosenDeliveryDate,
        quantity,
        price,
        remarks,
        terms,
        urgent,
        assignedTo,
    },
    openStatus,
    onClose,
}){

    const handleOnClose = () => {
      onClose();
    }

    const Field = ({ name, value }) => {
        return (
            <>
            <Typography variant={'h6'} style={{ color: 'grey' }}>
                {name}
            </Typography>
            <Typography variant={'h5'}>
                {value}
            </Typography>
            <br />
            </>
        )
    }

    return (
        <Dialog
            open={openStatus}
            aria-labelledby={'info'}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle id={'info'}>Order Info</DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item lg={6}>
                        <Field name={'ID'} value={id} />
                        <Field name={'Company'} value={chosenCompany} />
                        <Field name={'Product'} value={chosenProduct} />
                        <Field name={'Delivery Date'} value={chosenDeliveryDate} />
                        <Field name={'Quantity'} value={quantity} />
                    </Grid>
                    <Grid item lg={6}>
                        <Field name={'Price'} value={'RM'+price} />
                        <Field name={'Remarks'} value={remarks} />
                        <Field name={'Terms'} value={terms} />
                        <Field name={'Urgent?'} value={urgent} />
                        <Field name={'Assigned To'} value={assignedTo} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
