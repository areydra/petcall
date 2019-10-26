import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase/app'
import Home from './Pages/Home'
import { Provider } from 'react-redux'

import store from "./Redux/store";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } from "./key"

const firebaseConfig = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId };

// Initialize Firebase
(!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

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
