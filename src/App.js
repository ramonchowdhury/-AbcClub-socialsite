import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';

import BaseRouter from'./Routes';
import './App.css';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            { this.props.auth.isAuthenticated && <Navbar /> }
            <BaseRouter />
          </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
