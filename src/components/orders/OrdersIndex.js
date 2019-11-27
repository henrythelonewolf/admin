import React, { useState, useEffect } from 'react';
import PageContainer from './../shared/PageContainer';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { firebase } from './../../firebaseConfig';
import { snapshotToArray } from './../../Utils';

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

import DialogUpdate from './dialogs/DialogUpdate';
import DialogComplete from './dialogs/DialogComplete';

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
      { name: 'urgent', title: 'Urgent' },
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

  const getRowId = row => row.id;
  const handleSelectionChange = (selection) => {
    setSelection(selection);
  }

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const handleOpenUpdate = () => {
    setOpenUpdate(true)
  }
  const handleOpenComplete = () => {
    setOpenComplete(true)
  }

  const handleOnCloseUpdate = () => {
    setOpenUpdate(false)
  }
  const handleOnCloseComplete = () => {
    setOpenComplete(false)
  }

  const handleUpdateSubmit = () => {
    alert('updated')
    setOpenUpdate(false)
  }

  return (
    <PageContainer name={'Order List'}>
      <Paper>
        <div style={{ padding: 10 }}>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleOpenUpdate}
            disabled={selection.length === 0}
          >
            Mass Update
          </Button>

          <span style={{ paddingRight: 10 }} />

          <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleOpenComplete}
            disabled={selection.length === 0}
          >
            Mass Close
          </Button>
        </div>

        <DialogUpdate
          selection={selection}
          open={openUpdate}
          onClose={handleOnCloseUpdate}
          onFormSubmit={handleUpdateSubmit}
        />
        <DialogComplete
          selection={selection}
          open={openComplete}
          onClose={handleOnCloseComplete}
        />

        <Divider />
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <SearchState defaultValue={''} />
          <FilteringState />
          <SortingState
            defaultSorting={[
              { columnName: 'urgent', direction: 'desc' }
            ]}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={handleSelectionChange}
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
