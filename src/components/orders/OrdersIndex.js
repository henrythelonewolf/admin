import React, { useState, useEffect } from 'react';
import PageContainer from './../shared/PageContainer';
import {
  Paper,
  Divider,
  Button,
  CircularProgress,
  Link,
} from '@material-ui/core';

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
import DialogInfo from './dialogs/DialogInfo';

export default function OrdersIndex(){
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selections, setSelections] = useState([]);
  const [pageSizes] = useState([10, 30, 60]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoData, setInfoData] = useState({});

  const [columns] = useState([
      // { name: 'id', title: 'ID' },
      { name: 'chosenCompany', title: 'Company' },
      { name: 'id', title: 'ID' },
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

  async function fetchData(){
    setLoading(true);
    await firebase.database().ref('orders/').on('value', (snapshot) => {
      const orders = snapshotToArray(snapshot);
      setRows(orders);
      setLoading(false);
    });
  };

  useEffect( () => {
    fetchData();
  }, []);

  const getRowId = row => row.id;

  const handleSelectionChange = (selections) => {
    setSelections(selections);
  }

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  }
  const handleOpenComplete = () => {
    setOpenComplete(true);
  }

  const handleCloseDialog = () => {
    setOpenUpdate(false);
    setOpenComplete(false);
    setOpenInfo(false);
  }

  const handleOnCancel = () => {
    handleCloseDialog();
  }

  const handleOnSubmit = () => {
    setSelections([]);
    handleCloseDialog();
  }

  // const handleOnClickId = (clickedId) => {
  //   const data = rows.find( (row) => row.id === clickedId )
  //   setInfoData(data);
  //   setOpenInfo(true);
  // }

  const handleOnClickCompany = (clickedCompany) => {
    const data = rows.find( (row) => row.chosenCompany === clickedCompany )
    setInfoData(data);
    setOpenInfo(true);
  }

  const LinkCell = ({ value, style, ...restProps }) => {
    return (
      <Table.Cell {...restProps} style={{ ...style }}>
        <Link onClick={ () => { handleOnClickCompany(value) }}>{value}</Link>
      </Table.Cell>
    )
  }

  const NameCell = (props) => {
    const { column } = props;
    //Change from 'id' to 'chosenCompany'
    if (column.name === 'chosenCompany') {
      return <LinkCell {...props} />
    }
    return <Table.Cell {...props} />
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
        <DialogInfo
          data={infoData}
          openStatus={openInfo}
          onClose={handleOnCancel}
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
            <Table cellComponent={NameCell} />
            <TableColumnVisibility defaultHiddenColumnNames={['id']}/>
            <TableSelection
              showSelectAll={true}
              highlightRow={true}
              selectByRowClick={false}
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
