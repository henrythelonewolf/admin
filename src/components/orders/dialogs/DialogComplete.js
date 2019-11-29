import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
