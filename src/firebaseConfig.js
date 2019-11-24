import * as Firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyBicTthRDfbinpsrKvOAys6_FeKCjI6zS8",
    authDomain: "order-493f5.firebaseapp.com",
    databaseURL: "https://order-493f5.firebaseio.com",
    projectId: "order-493f5",
    storageBucket: "gs://order-493f5.appspot.com/",
    messagingSenderId: "874290960759",
    appId: "1:874290960759:web:63d916f9927de386"
};

export const firebase = Firebase.initializeApp(firebaseConfig);