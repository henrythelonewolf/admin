import React from 'react';

import ListViewIndex from './listView/ListViewIndex';
import DropdownViewIndex from './dropdownView/DropdownViewIndex';
import DetailViewIndex from './detailView/DetailViewIndex';

export default class OrdersIndex extends React.Component {
  state = {
    view: 'dropdown',
  }

  render(){
    const { view } = this.state;

    if (view === 'list') {
      return (
        <ListViewIndex />
      )
    } else if (view === 'dropdown') {
      return (
        <DropdownViewIndex />
      )
    } else if (view === 'detail') {
      return (
        <DetailViewIndex />
      )
    }
  }
}
