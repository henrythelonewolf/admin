import React, { useState } from 'react';
import { Container, Tab, Button } from 'semantic-ui-react';

import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data, Filters } from 'react-data-grid-addons';

import PendingOrders from './PendingOrders';
import ProcessedOrders from './ProcessedOrders';
import OutForDeliveryOrders from './OutForDeliveryOrders';
import OnHoldOrders from './OnHoldOrders';

const defaultColumnProperties = {
  filterable: true,
  width: 160,
}

const selectors = Data.Selectors;

const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter,
} = Filters;

const rows = [
  { id: 1, title: 'First Row', description: 'This is first row' },
  { id: 2, title: 'Second Row', description: 'This is second row' }
]

const columns = [
  {
    key: 'id',
    name: 'ID',
    filterRenderer: NumericFilter
  },
  {
    key: 'title',
    name: 'Title',
    filterRenderer: MultiSelectFilter,
  },
  {
    key: 'description',
    name: 'Description',
  },
].map( col => ({ ...col, ...defaultColumnProperties }));

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };

  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }

  return newFilters;
}

function getValidFilterValues(rows, columnId){
  return rows.map( row => row[columnId]).filter( (item, i, a) => {
    return i === a.indexOf(item);
  })
}

function getRows(rows, filters){
  return selectors.getRows({ rows, filters });
}

function MyDataGrid({ rows }) {
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  return (
    <ReactDataGrid
      rowGetter={ i => filteredRows[i] }
      columns={columns}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={ filter => setFilters(handleFilterChange(filter))}
      onClearFilters={ () => setFilters({})}
      getValidFilterValues={ columnKey => getValidFilterValues(rows, columnKey)}
    />
  )
}

export default class BoilerPlate extends React.Component {
  mainPanes = [
      { menuItem: 'Pending Orders', render: () => <PendingOrders /> },
      { menuItem: 'Processed Orders', render: () => <ProcessedOrders /> },
      { menuItem: 'Out For Delivery Orders', render: () => <OutForDeliveryOrders /> },
      { menuItem: 'On-Hold Orders', render: () => <OnHoldOrders /> },
  ]

  state = {
    toggleView: false
  }

  render(){
    const { toggleView } = this.state;

    return (
      <Container>
      {!toggleView && (
        <>
        <Button onClick={ () => this.setState({ toggleView: !toggleView})}>
        List View
        </Button>
        <Tab panes={this.mainPanes} />
        </>
      )}

      {toggleView && (
        <>
        <Button onClick={ () => this.setState({ toggleView: !toggleView})}>
        Individual View
        </Button>
        <MyDataGrid rows={rows} />
        </>
      )}
      </Container>
    )
  }
}
