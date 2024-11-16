// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryForm from './components/StoryForm';
import StoryResult from './components/StoryResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryForm />} />
        <Route path="/story/:id" element={<StoryResult />} />
      </Routes>
    </Router>
  );
}

export default App;