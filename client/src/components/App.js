import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Verse from './Verse';
import MyVerses from './MyVerses';
import MemorizeVerse from './MemorizeVerse';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    // this.props.postVerse();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/verse/my_verses" component={MyVerses} />
            <Route exact path="/verse/new" component={Verse} />
            <Route exact path="/memorize" component={MemorizeVerse} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

export default connect(null, actions)(App);
