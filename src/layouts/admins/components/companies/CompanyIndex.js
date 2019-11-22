import React, { useState, useEffect } from 'react';
import { firebase } from './../../../../firebaseConfig';
import { snapshotToArray } from './../../../../Utils';

import Paper from '@material-ui/core/Paper';
import {
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  PagingState,
  SelectionState,
  SortingState,
  SearchState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableSelection,
  Toolbar,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui';
import PageContainer from './../shared/PageContainer';

export default function CompanyIndex(){
  const [rowData, setRowData] = useState([]);

  async function fetchData(){
    await firebase.database().ref('companies/').on('value', (snapshot) => {
      const companies = snapshotToArray(snapshot);
      setRowData(companies);
    });
  };

  useEffect( () => {
    fetchData();
  }, [])

  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'title', title: 'Title'},
  ]);
  const [pageSizes] = useState([10, 15, 30]);

  return (
    <PageContainer name={'Manage Companies'}>
      <Paper>
        <Grid
          rows={rowData}
          columns={columns}
        >
          <SearchState defaultValue={''} />
          <SortingState />
          <SelectionState />
          <PagingState />

          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <Table />
          <TableSelection showSelectAll={true} />
          <TableHeaderRow showSortingControls={true} />
          <PagingPanel pageSizes={pageSizes} />
          <Toolbar />
          <SearchPanel />

        </Grid>
      </Paper>
    </PageContainer>
  )
}
