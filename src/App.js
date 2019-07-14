import React from 'react';
import './App.css';
import MainContainer from './components/mainContainer.js';

function App() {
  return (
    <div className="App">
      <div className="app-title">
        <div id="score-image"/>
      </div>
      <MainContainer />
    </div>
  );
}

export default App;
