import { firebase } from './firebaseConfig';

export function idGenerator(){
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

export function formattedDate(chosenDeliveryDate){
  const d = new Date(chosenDeliveryDate);
  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const date = d.getDate().toString().padStart(2, '0');

  return year + '-' + month + '-' + date;
}

export const newOrder = (attrs = {}) => {
  const currentUserId = firebase.auth().currentUser.uid;

  const order = {
    id: idGenerator(),
    chosenDeliveryDate: attrs.chosenDeliveryDate || formattedDate(new Date()),
    chosenCompany: attrs.chosenCompany || 'Undefined',
    chosenProduct: attrs.chosenProduct || 'Undefined',
    quantity: attrs.quantity || 'Undefined',
    price: attrs.price || 'Undefined',
    remarks: attrs.remarks || 'Undefined',
    terms: attrs.terms || 'Undefined',
    status: 'Pending',
    createdAt: new Date().toString(),
    urgent: attrs.urgent || 'false',
    histories: [
      {
        id: idGenerator(),
        description: 'Order creation',
        updated_by: currentUserId,
        updatedAt: new Date().toString(),
      }
    ],
    type: 'Open',
    assignedTo: attrs.assignedTo || '',
  }
  return order;
};

export const createNewItem = (newItem) => {
  const item = {
    id: idGenerator(),
    name: newItem,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  }
  return item;
}

export function snapshotToArray(snapshot){
  var itemArr = [];
  snapshot.forEach( (child) => {
    var item = child.val();
    item.id = child.key;
    itemArr.push(item);
  })
  return itemArr;
}
