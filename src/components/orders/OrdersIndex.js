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
import CircularProgress from '@material-ui/core/CircularProgress';

export default function OrdersIndex(){
  const [loading, setLoading] = useState(false);

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
      { name: 'createdAt', title: 'Created at' },
      { name: 'type', title: 'Status Type' },
      { name: 'assignedTo', title: 'Assignee' },
  ]);

  const [rows, setRows] = useState([]);

  async function fetchData(){
    setLoading(true);
    await firebase.database().ref('orders/').on('value', (snapshot) => {
      const orders = snapshotToArray(snapshot);
      setRows(orders);
      setLoading(false);
    });
  };
  const [selections, setSelections] = useState([]);

  useEffect( () => {
    fetchData();
  }, []);

  const [pageSizes] = useState([10, 30, 60]);


  const getRowId = row => row.id;
  const handleSelectionChange = (selections) => {
    setSelections(selections);
  }

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  }
  const handleOpenComplete = () => {
    setOpenComplete(true);
  }

  const handleCloseDialog = () => {
    setOpenUpdate(false);
    setOpenComplete(false);
  }

  const handleOnCancel = () => {
    handleCloseDialog();
  }

  const handleOnSubmit = () => {
    setSelections([]);
    handleCloseDialog();
  }

  return (
    <PageContainer name={'Order List'}>
      <Paper>
        <div style={{ padding: 10 }}>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleOpenUpdate}
            disabled={selections.length === 0}
          >
            Mass Update
          </Button>

          <span style={{ paddingRight: 10 }} />

          <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleOpenComplete}
            disabled={selections.length === 0}
          >
            Mass Close
          </Button>
        </div>

        <DialogUpdate
          selections={selections}
          openStatus={openUpdate}
          onSubmit={handleOnSubmit}
          onCancel={handleOnCancel}
        />
        <DialogComplete
          selections={selections}
          openStatus={openComplete}
          onSubmit={handleOnSubmit}
          onCancel={handleOnCancel}
        />

        <Divider />

        {loading && (
          <div style={{ height: 200, paddingLeft: '50%', paddingTop: 100 }}>
            <CircularProgress />
          </div>
        )}

        {!loading && (
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
              selections={selections}
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
            <IntegratedSelection />
            <IntegratedPaging />

            <DragDropProvider />
            <Table />
            <TableColumnVisibility />
            <TableSelection
              showSelectAll={true}
              highlightRow={true}
              selectByRowClick={true}
            />
            <TableHeaderRow showSortingControls={true} />
            <TableFilterRow showFilterSelector={true} />
            <PagingPanel pageSizes={pageSizes} />
            <TableGroupRow />
            <Toolbar />
            <SearchPanel />
            <ColumnChooser />
            <GroupingPanel showSortingControls={true} />
          </Grid>
        )}

      </Paper>
    </PageContainer>
  );
};
