import React from 'react';
import './App.css';
import AlbumList from './albumList/albumList';

function App() {
  return (
    <div className="ui container">
      <h2>Albums</h2>
      <AlbumList></AlbumList>
    </div>
  );
}

export default App;