// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryForm from './components/StoryForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryForm />} />
      </Routes>
    </Router>
  );
}

export default App;