import React, { useState, useEffect } from 'react';
import { firebase } from './../../../../firebaseConfig';
import { snapshotToArray } from './../../../../Utils';
import PageContainer from './../shared/PageContainer';
import Paper from '@material-ui/core/Paper';

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
  RowDetailState,
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
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

const RowDetail = ({ row }) => (
  <div>
    Details for
  </div>
);

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

  return (
    <PageContainer name={'Order List'}>
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
        {console.log(rows)}
        {console.log(columns)}
          <SearchState defaultValue={''} />
          <FilteringState />
          <SortingState />
          <SelectionState />

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

          <RowDetailState />
          <Table />
          <TableColumnVisibility />
          <TableSelection showSelectAll={true} />

          <TableHeaderRow showSortingControls={true} />
          <TableRowDetail
            contentComponent={RowDetail}
          />
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
