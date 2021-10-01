import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="p-4">
        Hola mundo
      </div>

    </Router>
  );
}

export default App;
