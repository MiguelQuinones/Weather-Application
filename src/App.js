// Import statements
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Import components
import weatherPage from "./components/weatherPage";
import weatherPageWeek from "./components/weatherPageWeek";
import "./App.css";

// Main landing page for app
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="navbar-item-one"> Daily Forecast </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/weekly" className="navbar-item-two"> Weekly Forecast </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={weatherPage} />
          <Route path="/weekly" component={weatherPageWeek} />
        </div>
      </Router>
    )
  }
}

export default App;
