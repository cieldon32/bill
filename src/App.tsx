import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from '@/components-ui/layout';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
