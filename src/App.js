import React from 'react';
import './App.css';
import MainContainer from './components/mainContainer.js';

function App() {
  return (
    <div className="App">
      <div className="app-title">
        João's
        <div className="the-score-text">
          the<span className="score-s">S</span>core
        </div>
        App
      </div>
      <MainContainer />
    </div>
  );
}

export default App;
