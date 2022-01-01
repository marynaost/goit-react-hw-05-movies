import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Container from 'components/Container/Container';
import AppBar from 'components/AppBar/AppBar';
import HomePage from 'pages/HomePage/HomePage';
import MoviesPage from 'pages/MoviesPage/MoviesPage';
import MoviesPageDetail from 'pages/MoviesPageDetail/MoviesPageDetail';

export default function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies" exact component={MoviesPage} />
        <Route path="/movies/:moviesId" component={MoviesPageDetail} />
      </Switch>
    </Container>
  );
}
