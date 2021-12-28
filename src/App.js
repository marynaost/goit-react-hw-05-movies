import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AppBar from 'components/AppBar/AppBar';
import HomePage from 'vievs/HomePage';
import MoviesPage from 'vievs/MoviesPage';

export default function App() {
  return (
    <div className="App">
      <AppBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies" component={MoviesPage} />
      </Switch>
    </div>
  );
}
