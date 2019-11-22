import React, { useState, useEffect } from 'react';
import { firebase } from './../../../../firebaseConfig';
import { snapshotToArray } from './../../../../Utils';
import uuidv4 from 'uuid/v4';

import Paper from '@material-ui/core/Paper';
import {
  IntegratedFiltering,
  IntegratedPaging,
  // IntegratedSelection,
  IntegratedSorting,
  PagingState,
  // SelectionState,
  SortingState,
  SearchState,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  // TableSelection,
  Toolbar,
  SearchPanel,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import PageContainer from './../shared/PageContainer';

const getRowId = row => row.id;

export default function ProductIndex(){
  const [rowData, setRowData] = useState([]);

  async function fetchData(){
    await firebase.database().ref('products/').on('value', (snapshot) => {
      const products = snapshotToArray(snapshot);
      setRowData(products);
    });
  };

  useEffect( () => {
    fetchData();
  }, [])

  const [columns] = useState([
    { name: 'name', title: 'Name'},
  ]);
  const [pageSizes] = useState([10, 15, 30]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const changeAddedRows = (value) => {
    const initialized = value.map(row => (
      Object.keys(row).length 
      ? row 
      : { 
        id: uuidv4(), 
        updated_at: new Date().toString(),
        created_at: new Date().toString(),
      })
    );
    setAddedRows(initialized);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rowData.length > 0 ? rowData[rowData.length - 1].id + 1 : 0;
      changedRows = [
        ...rowData,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rowData.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rowData.filter(row => !deletedSet.has(row.id));
    }
    setRowData(changedRows);

    // save to firebase
    firebase.database().ref('products/').set(changedRows);
  };

  return (
    <PageContainer name={'Manage Products'}>
      <Paper>
        <Grid
          rows={rowData}
          columns={columns}
          getRowId={getRowId}
        >
          <SearchState defaultValue={''} />
          <SortingState />
          {/* <SelectionState /> */}
          <PagingState />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}

            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            
            onCommitChanges={commitChanges}
          />

          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          {/* <IntegratedSelection /> */}

          <Table />
          {/* <TableSelection showSelectAll={true} /> */}
          <TableHeaderRow showSortingControls={true} />
          <TableEditRow />
          <TableEditColumn 
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
          />
          <PagingPanel pageSizes={pageSizes} />
          <Toolbar />
          <SearchPanel />

        </Grid>
      </Paper>
    </PageContainer>
  )
}
