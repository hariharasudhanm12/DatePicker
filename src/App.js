import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import RecurringDatePicker from './components/RecurringDatePicker';

function App() {
  return (
    <Router>
      <div className="App">
        
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recurring-date-picker">Recurring Date Picker</Link>
            </li>
          </ul>
        </nav>

      
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/recurring-date-picker" element={<RecurringDatePicker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
