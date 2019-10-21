import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/search/:name' exact component={Home} />
    </Router>
  );
}

export default App;
