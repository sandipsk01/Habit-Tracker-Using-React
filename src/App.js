import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import to include Routes
import { Provider } from 'react-redux';
import store from './Redux/store';
import Dashboard from './Components/Dashboard/Dashboard';
import Weekly from './Components/Weekly/Weekly';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes> {/* Replace Switch with Routes */}
            <Route path="/" element={<Dashboard />} /> {/* Use element prop instead of component */}
            <Route path="/weekly" element={<Weekly />} /> {/* Use element prop instead of component */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
