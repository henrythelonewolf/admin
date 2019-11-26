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

export default function DialogComplete({
    selection,
    open,
    onClose,
}){
    const closesAs = ['Delivered', 'Rejected', 'Canceled'];
    const [closeAs, setCloseAs] = useState('');

    const handleChosenCloseAs = (event) => {
        setCloseAs(event.target.value);
    }

    const handleSubmitCloseAs = () => {
        if (!closeAs) {
            alert('Choose')
        } else {
            // firebase update status here
            onClose()
        }
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
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
                            {selection.map( (id) => (
                                <Chip label={id} style={{ margin: 5 }} />
                            ) )}
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
                <Button onClick={handleSubmitCloseAs} color="primary">
                    Finish
                </Button>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}