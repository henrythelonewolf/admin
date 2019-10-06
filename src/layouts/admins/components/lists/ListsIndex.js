import React from 'react';

import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid-addons';

export default class ListsIndex extends React.Component {
  state = {
    columns: [
      {
        key: 'id',
        name: 'ID',
        filterable: true,
        // width: 200,
      },
      {
        key: 'status',
        name: 'Status',
        filterable: true,
        // width: 200,
      },
      {
        key: 'company',
        name: 'Company',
        filterable: true,
        // width: 200,
      },
      {
        key: 'product',
        name: 'Product',
        filterable: true,
        // width: 200,
      },
      {
        key: 'date',
        name: 'Date',
        filterable: true,
        // width: 200,
      },
      {
        key: 'quantity',
        name: 'Quantity',
        filterable: true,
        // width: 200,
      },
      {
        key: 'price',
        name: 'Price',
        filterable: true,
        // width: 200,
      },
      {
        key: 'terms',
        name: 'Terms',
        filterable: true,
        // width: 200,
      },
      {
        key: 'remarks',
        name: 'Remarks',
        filterable: true,
        // width: 200,
      },
      {
        key: 'urgent',
        name: 'Urgent',
        filterable: true,
        // width: 200,
      },
      {
        key: 'createdAt',
        name: 'Created At',
        filterable: true,
        // width: 200,
      },
      {
        key: 'updatedAt',
        name: 'Updated At',
        filterable: true,
        // width: 200,
      },
    ],

    rows: [
      {
        id: '1',
        status: 'First Row',
        company: 'This is first row',
        product: 'Product One',
        date: '2019-09-12',
        quantity: '123',
        price: '123.34',
        terms: 'Undefined',
        remarks: 'Undefined',
        urgent: 'Yes',
        createdAt: '2019-09-12',
        updatedAt: '2019-09-23',
      },
      {
        id: '2',
        status: 'Second Row',
        company: 'This is second row',
        product: 'Product Two',
        date: '2019-09-12',
        quantity: '123',
        price: '123.34',
        terms: 'Undefined',
        remarks: 'Undefined',
        urgent: 'No',
        createdAt: '2019-09-12',
        updatedAt: '2019-09-23',
      },
      {
        id: '1',
        status: 'First Row',
        company: 'This is first row',
        product: 'Product One',
        date: '2019-09-12',
        quantity: '123',
        price: '123.34',
        terms: 'Undefined',
        remarks: 'Undefined',
        urgent: 'Yes',
        createdAt: '2019-09-12',
        updatedAt: '2019-09-23',
      },
      {
        id: '2',
        status: 'Second Row',
        company: 'This is second row',
        product: 'Product Two',
        date: '2019-09-12',
        quantity: '123',
        price: '123.34',
        terms: 'Undefined',
        remarks: 'Undefined',
        urgent: 'No',
        createdAt: '2019-09-12',
        updatedAt: '2019-09-23',
      },
    ],
    filters: {},
    selectedIndexes: [],
  }

  handleFilterChange = filter => filters => {
    const newFilters = { ...filters };

    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }

    return newFilters;
  }

  getValidFilterValues = (rows, columnId) => {
    return rows.map( row => row[columnId]).filter( (item, i, a) => {
      return i === a.indexOf(item);
    })
  }

  onRowsSelected = rows => {
    const { selectedIndexes } = this.state;
    this.setState({
      selectedIndexes: selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    });
  };

  onRowsDeselected = rows => {
    const { selectedIndexes } = this.state;
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });
  };

  render(){
    const { rows, columns, filters, selectedIndexes } = this.state;
    const filteredRows = Data.Selectors.getRows({ rows, filters });

    // set default column width
    columns.map( col => ({ ...col, width: 100 }))

    return (
      <ReactDataGrid
        rowKey={'id'}
        rowGetter={ i => filteredRows[i] }
        rowsCount={filteredRows.length}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: this.onRowsSelected,
          onRowsDeselected: this.onRowsDeselected,
          selectBy: {
            indexes: selectedIndexes
          }
        }}

        columns={columns}

        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={ filter => this.setState({ filters: this.handleFilterChange(filter)(filters) }) }
        onClearFilters={ () => this.setState({ filters: {} })}
        getValidFilterValues={ columnKey => this.getValidFilterValues(rows, columnKey) }

        minHeight={645}
      />
    )
  }
}
