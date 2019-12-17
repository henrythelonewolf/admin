import * as Firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyClMBrR-LF1qs-zmMbBIFLAaj6jQcTFMjY",
    authDomain: "lcp-portal.firebaseapp.com",
    databaseURL: "https://lcp-portal.firebaseio.com",
    projectId: "lcp-portal",
    storageBucket: "lcp-portal.appspot.com",
    messagingSenderId: "175218264087",
    appId: "1:175218264087:web:25d4d0b28cab7ac662b452",
    measurementId: "G-ZECX8G9CWG"
  };

export const firebase = Firebase.initializeApp(firebaseConfig);