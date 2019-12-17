import React, { useState } from 'react';
import {
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    Grid,
    Divider,
} from '@material-ui/core';

import { firebase } from './../../../firebaseConfig';

export default function DialogComplete({
    selections,
    openStatus,
    onSubmit,
    onCancel,
}){
    const closesAs = ['Delivered', 'Rejected', 'Canceled'];
    const [closeAs, setCloseAs] = useState('');

    const handleChosenCloseAs = (event) => {
        setCloseAs(event.target.value);
    }

    const clearCloseAs = () => {
      setCloseAs('');
    }

    const handleOnSubmitCloseAs = (event) => {
        event.preventDefault();

        if (!closeAs) {
            alert('Please choose!')
        } else {
            const updates = {
              status: closeAs,
              type: 'Closed',
            }
            // firebase update status here
            selections.map(
              async (selection) => {
                return await firebase.database().ref('orders/' + selection).update(updates)
              }
            );

            clearCloseAs();
            onSubmit();
        }
    }

    const handleOnCancel = () => {
      clearCloseAs();
      onCancel();
    }

    return (
        <Dialog
            open={openStatus}
            onClose={clearCloseAs}
            aria-labelledby={'massClose'}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle id={'massClose'}>Mass Close</DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item lg={6}>
                        <DialogContentText>
                            Closing ticket ID:
                            <br />
                            {selections.map( (id) => (
                                <Chip key={id} label={id} style={{ margin: 5 }} />
                            ) )}
                            <Divider />
                            Total tickets: {selections.length}
                        </DialogContentText>
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl
                            fullWidth
                            variant={'outlined'}
                            margin={'normal'}
                            required
                            >
                            <InputLabel id={'closeAs'}>
                                Close As
                            </InputLabel>
                            <Select
                                id={'closeAs'}
                                name={'closeAs'}
                                value={closeAs}
                                onChange={handleChosenCloseAs}
                                labelWidth={60}
                            >
                            {closesAs.map( (item) => (
                                <MenuItem
                                key={item}
                                value={item}
                                >
                                {item}
                                </MenuItem>
                            ) )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnSubmitCloseAs} color="primary">
                    Finish
                </Button>
                <Button onClick={handleOnCancel} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
