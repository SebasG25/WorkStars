import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="p-4">
        Hola Mundo!
      </div>

    </Router>
  );
}

export default App;
