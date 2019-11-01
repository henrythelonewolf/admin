import store from './store';
import { firebase } from './firebaseConfig';

const idGenerator = () => {
  // generate id: YYYYMMDDhhmmss
  const d = new Date();
  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const date = d.getDate().toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return year + month + date + hours + minutes + seconds;
}

export const newOrder = (attrs = {}) => {
  const order = {
    id: idGenerator(),
    chosenDate: attrs.chosenDate || 'Undefined',
    chosenCompany: attrs.chosenCompany || 'Undefined',
    chosenProduct: attrs.chosenProduct || 'Undefined',
    quantity: attrs.quantity || 'Undefined',
    price: attrs.price || 'Undefined',
    remarks: attrs.remarks || 'Undefined',
    terms: attrs.terms || 'Undefined',
    status: 'Pending',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    urgent: attrs.urgent || false,
  }

  return order;
};

export const createNewItem = (newItem) => {
  const item = {
    id: idGenerator(),
    title: newItem,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  }

  return item;
}

export function getCurrentUser(){
  if (Object.entries(store.getState().currentUser).length === 0) {
    const currentUser = firebase.auth().currentUser;
    store.setState({ currentUser });
    console.log('fetched user');
    console.log(currentUser);
  }
}

export function snapshotToArray(snapshot){
  var itemArr = [];

  snapshot.forEach( (child) => {
    var item = child.val();
    item.id = child.key;

    itemArr.push(item);
  })

  var sortedCreatedAt = itemArr.sort((a,b) => (a.created_at < b.created_at) ? 1 : -1);
  // return array and reverse sort so that the latest will be on top
  return sortedCreatedAt.sort((a,b) => (a.urgent === b.urgent) ? 0 : a.urgent ? -1 : 1);
}

export const badgeStatusColor = (status) => {
  if (status === 'Pending') {
    return 'orange';
  }else if (status === 'Processed') {
    return '#5cb85c';
  }else if (status === 'Out For Delivery') {
    return 'darkgrey';
  }else if (status === 'On Hold') {
    return 'black';
  }
}
