import * as React from 'react';
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
} from '@devexpress/dx-react-grid-material-ui';

import PageContainer from './../shared/PageContainer';

export default () => {
  const [columns] = React.useState([
      { name: 'id', title: 'ID' },
      { name: 'chosenCompany', title: 'Company' },
      { name: 'chosenProduct', title: 'Product' },
      { name: 'chosenDate', title: 'Date' },
      { name: 'price', title: 'Price' },
      { name: 'quantity', title: 'Quantity' },
      { name: 'remarks', title: 'Remarks' },
      { name: 'terms', title: 'Terms' },
      { name: 'status', title: 'Status' },
      { name: 'urgency', title: 'Urgency' },
      { name: 'created_at', title: 'Created at' },
      { name: 'updated_at', title: 'Updated at' },
      { name: 'type', title: 'Status Type' },
  ]);
  const data = [
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'Pending',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Open',
    },
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'Processing',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Open',
    },
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'Out-For-Delivery',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Open',
    },
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'On-Hold',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Open',
    },
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'Rejected',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Closed',
    },
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'Delivered',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Closed',
    },
    {
      id: '123456',
      chosenCompany: 'Company A',
      chosenProduct: 'Product A',
      chosenDate: '2019-10-2',
      price: '12.45',
      quantity: '12',
      remarks: 'Undefined',
      terms: 'Undefined',
      status: 'Canceled',
      urgency: 'Yes',
      created_at: '2019-10-4',
      updated_at: '2019-10-3',
      type: 'Closed',
    },
  ]
  const [rows] = React.useState(data);
  const [pageSizes] = React.useState([5, 10, 15]);

  return (
    <PageContainer name={'Orders'}>
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
      {console.log(rows)}
      {console.log(columns)}
        <FilteringState />
        <SortingState />
        <SelectionState />

        <GroupingState
          defaultGrouping={[
            { columnName: 'type' },
            { columnName: 'status' },
          ]}
          defaultExpandedGroups={['Open']}
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
        <ColumnChooser />
        <GroupingPanel showSortingControls={true} />
      </Grid>
    </Paper>
    </PageContainer>
  );
};
