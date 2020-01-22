import React from 'react';
import Header from './github/components/Header/Header';
import GithubUser from './github/components/GithubUser/GithubUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <GithubUser />        
      </div>
    </div>
  );
}

export default App;
