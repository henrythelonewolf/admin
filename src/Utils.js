import { firebase } from './firebaseConfig';

export function idGenerator(){
  const uuid = require('uuid/v4');
  // var data = Promise.race(getCurrentMonthFromFirebase());
  // var data = getCurrentMonthFromFirebase();
  // console.log(getValueFromPromise(data));

  return uuid();
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

export function snapshotToArrayWithoutID(snapshot){
  var itemArr = [];
  snapshot.forEach( (child) => {
    var item = child.val();
    itemArr.push(item);
  })
  return itemArr;
}

export function snapshotToArrayID(snapshot){
  var itemArr = [];
  snapshot.forEach(function(childSnapshot){
    var item = childSnapshot.key;
    itemArr.push(item);
  })
  return itemArr;
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


//____Ignore below____

// export function getValueFromPromise(promise){
//   var value;
//   Promise.allSettled([promise]).then(function(result) {
//     value = result[0].value;
//     console.log('Value = ' + value);
//   });
//   return value;
// }

// export async function createOrderID() {

//   var orderID = '000';

//   var previousID = await getLastOrderID();
//   var monthFirebase = await getCurrentMonthFromFirebase();
//   var monthLocal = getCurrentMonthFromLocal();

//   if (previousID == orderID) {
//     orderID = previousID + 1;
//   }
//   else if (monthFirebase == monthLocal) {
//     orderID = previousID + 1;
//   }
//   else {
//     orderID = '000';
//     await firebase.database().ref('orderCounter/currentMonth').set(monthLocal);
//   }

//   var tempDate = new Date();
//   tempDate.setHours( tempDate.getHours() + 8);
  
//   return tempDate.getUTCFullYear().toString().substr(-2) + monthLocal + orderID;
// }

// async function getLastOrderID(){
//   //var database = firebase.database();
//   const test = await firebase.database().ref('orders').limitToLast(1).once('value').then (function(snapshot) {
//     return snapshotToArrayID(snapshot);
//   }, function(error) {
//     // The Promise was rejected.
//     console.error(error);
//   });

//   const lastID = test.toString();
//   var IDnum = parseInt(lastID.substr(lastID.length - 3));
//   return IDnum;
// }

// async function getCurrentMonthFromFirebase(){
//   var test;
//   return test = snapshotToArrayWithoutID(await firebase.database().ref('orderCounter/').once('value').then (result => {
//     return result;
//   }, function(error) {
//     // The Promise was rejected.
//     console.error(error);
//   }))[1];

//   // return snapshotToArrayWithoutID(test)[0];
// }

// export function getCurrentMonthFromLocal(){
//   var tempDate = new Date();
//   tempDate.setHours( tempDate.getHours() + 8);
//   // console.log('MYT Datetime = ' + tempDate.getUTCFullYear() + '-' + tempDate.getUTCMonth() + '-' + tempDate.getUTCDate() +' '+ tempDate.getUTCHours()+':'+ tempDate.getUTCMinutes()+':'+ tempDate.getUTCSeconds());
//   return (tempDate.getUTCMonth() + 1);
// }

