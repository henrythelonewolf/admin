import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

import { firebase } from './../../firebaseConfig';
import { snapshotToArray, idGenerator } from './../../Utils';

import {
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SortingState,
  SearchState,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import PageContainer from './../shared/PageContainer';

const getRowId = row => row.id;

export default function AssigneeIndex(){
  const [rowData, setRowData] = useState([]);

  async function fetchData(){
    await firebase.database().ref('assignees/').on('value', (snapshot) => {
      const assignees = snapshotToArray(snapshot);
      setRowData(assignees);
    });
  };

  useEffect( () => {
    fetchData();
  }, [])

  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'email', title: 'Email' },
    { name: 'uid', title: 'UID' },
    { name: 'createdAt', title: 'Created At' },
    { name: 'updatedAt', title: 'Updated At' },
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
        id: idGenerator(),
        updatedAt: new Date().toString(),
        createdAt: new Date().toString(),
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
      changedRows = rowData.map(row => (changed[row.id]
        ? {
          ...row,
          ...changed[row.id],
          updatedAt: new Date().toString()
        }
        : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rowData.filter(row => !deletedSet.has(row.id));
    }
    setRowData(changedRows);

    // save to firebase
    firebase.database().ref('assignees/').update(changedRows);
  };

  return (
    <PageContainer name={'Manage Assignees'}>
      <Paper>
        <Grid
          rows={rowData}
          columns={columns}
          getRowId={getRowId}
        >
          <SearchState defaultValue={''} />
          <SortingState />
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

          <Table />
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
