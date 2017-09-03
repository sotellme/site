require('./assets/stylesheets/styles.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App.js';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './app/components/scenes/home/Home';
import Room from './app/components/scenes/room/Room';

// Hack to make react router scroll to # in location
function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

const router = (
    <Router history = {browserHistory} onUpdate={hashLinkScroll}>
      <Route path="/" component={App}>
        <IndexRoute component={ Home }></IndexRoute>
        <Route exact path="/room/:id" component={ Room }></Route>
      </Route>
    </Router>
)
  
ReactDOM.render(router, document.getElementById('root'));

