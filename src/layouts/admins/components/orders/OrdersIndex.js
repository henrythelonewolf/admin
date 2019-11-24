import React, { useState, useEffect } from 'react';
import { firebase } from './../../../../firebaseConfig';
import { snapshotToArray } from './../../../../Utils';
import PageContainer from './../shared/PageContainer';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OrderForm from './../creates/OrderForm';

import {
  FilteringState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  PagingState,
  SelectionState,
  SortingState,
  SearchState,
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  GroupingPanel,
  PagingPanel,
  Table,
  TableFilterRow,
  TableGroupRow,
  TableHeaderRow,
  TableSelection,
  Toolbar,
  ColumnChooser,
  TableColumnVisibility,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui';

export default function OrdersIndex(){
  const [columns] = useState([
      { name: 'id', title: 'ID' },
      { name: 'chosenCompany', title: 'Company' },
      { name: 'chosenProduct', title: 'Product' },
      { name: 'chosenDeliveryDate', title: 'Delivery Date' },
      { name: 'price', title: 'Price' },
      { name: 'quantity', title: 'Quantity' },
      { name: 'remarks', title: 'Remarks' },
      { name: 'terms', title: 'Terms' },
      { name: 'status', title: 'Status' },
      { name: 'urgency', title: 'Urgency' },
      { name: 'created_at', title: 'Created at' },
      { name: 'type', title: 'Status Type' },
      { name: 'assigned_to', title: 'Assignee' },
  ]);

  const [rows, setRows] = useState([]);

  async function fetchData(){
    await firebase.database().ref('orders/').on('value', (snapshot) => {
      const orders = snapshotToArray(snapshot);
      setRows(orders);
    });
  };

  useEffect( () => {
    fetchData();
  }, []);

  const [pageSizes] = useState([10, 15, 30]);

  const [selection, setSelection] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenMassUpdate = () => {
    setOpenDialog(true);
  }

  const handleCloseMassUpdate = () => {
    setOpenDialog(false);
  }

  const handleMassUpdate = () => {
    alert('updated')
    setOpenDialog(false);
  }

  return (
    <PageContainer name={'Order List'}>
      <Paper>
        <div style={{ padding: 10 }}>
          <Button 
            variant={'contained'} 
            color={'primary'} 
            onClick={handleOpenMassUpdate}
            disabled={selection.length === 0}
          >
            Mass Update
          </Button>
        </div>

        <Dialog open={openDialog} onClose={handleCloseMassUpdate} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Mass Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Updating ticket ID:
              <br />
              {selection}
              <br />
              Fill in the form below for mass updates.
            </DialogContentText>

            <OrderForm 
              massUpdateText={'Mass Updates'} 
              onFormSubmit={handleMassUpdate} 
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMassUpdate} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Divider />
        <Grid
          rows={rows}
          columns={columns}
        >
          <SearchState defaultValue={''} />
          <FilteringState />
          <SortingState />
          <SelectionState 
            selection={selection}
            onSelectionChange={setSelection}
          />

          <GroupingState
            defaultGrouping={[
              { columnName: 'type' },
              { columnName: 'status' },
            ]}
            defaultExpandedGroups={[
              'Open', 
              'Open|Pending'
            ]}
          />
          <PagingState />

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <DragDropProvider />
          <Table />
          <TableColumnVisibility />
          <TableSelection showSelectAll={true} />
          <TableHeaderRow showSortingControls={true} />
          <TableFilterRow showFilterSelector={true} />
          <PagingPanel pageSizes={pageSizes} />
          <TableGroupRow />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />
          <GroupingPanel showSortingControls={true} />
        </Grid>
      </Paper>
    </PageContainer>
  );
};
