import React from 'react';
import './App.css'; // This will import the global CSS (including Tailwind)
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <Chatbot />
    </div>
  );
}

export default App;
