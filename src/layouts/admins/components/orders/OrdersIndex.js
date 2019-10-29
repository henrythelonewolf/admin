import React, { useState } from 'react';

import ListViewIndex from './listView/ListViewIndex';
import DropdownViewIndex from './dropdownView/DropdownViewIndex';
import DetailViewIndex from './detailView/DetailViewIndex';

import PageContainer from './../shared/PageContainer';

export default function OrdersIndex(){
  const [ view ] = useState('dropdown');

  return (
      <PageContainer name={'Orders'}>
      {view === 'list' && (
        <ListViewIndex />
      )}

      {view === 'dropdown' && (
        <DropdownViewIndex />
      )}

      {view === 'detail' && (
        <DetailViewIndex />
      )}
      </PageContainer>
  )
}
