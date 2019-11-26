import React from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import MassUpdateForm from './MassUpdateForm';

export default function DialogUpdate({
    selection,
    open,
    onClose,
    onFormSubmit,
}){
    return (
        <Dialog 
          open={open} 
          onClose={onClose} 
          aria-labelledby={'massUpdate'}
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle id={'massUpdate'}>Mass Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Updating ticket ID:
              <br />
              {selection.map( (id) => (
                <span style={{ paddingRight: 5 }}>
                <Chip label={id} />
                </span>
              ) )}
              <br />
              <br />
              Fill in the form below for mass updates.
            </DialogContentText>

            <MassUpdateForm  onFormSubmit={onFormSubmit} />

          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    )
}