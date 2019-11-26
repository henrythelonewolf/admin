import React from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function DialogComplete({
    selection,
    open,
    onClose,
}){
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            aria-labelledby={'massClose'}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <DialogTitle id={'massClose'}>Mass Close</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Closing ticket ID:
                <br />
                {selection.map( (id) => (
                <span style={{ paddingRight: 5 }}>
                    <Chip label={id} />
                </span>
                ) )}
            </DialogContentText>

            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
    )
}