import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        {/* Create route to main page or search page */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/searchPage" component={SearchPage} />
        <div className="open-search">
          {/* Link tag for react router link navigation */}
          <Link to="/searchPage">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp;