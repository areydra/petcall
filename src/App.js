import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase/app'
import Home from './Pages/Home'
import { Provider } from 'react-redux'

import store from "./Redux/store";

var firebaseConfig = {
  apiKey: "AIzaSyDZ7qrf-R4CQLpm15CR-79yHZ8pxs-sqdg",
  authDomain: "petcall-97d9d.firebaseapp.com",
  databaseURL: "https://petcall-97d9d.firebaseio.com",
  projectId: "petcall-97d9d",
  storageBucket: "petcall-97d9d.appspot.com",
  messagingSenderId: "529810585741",
  appId: "1:529810585741:web:2dc068d1d564a4dd168ac4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Provider store={store} >
        <Route path='/' exact component={Home} />
        <Route path='/search/:name' exact component={Home} />
      </Provider>
    </Router>
  );
}

export default App;
