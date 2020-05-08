import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksLibrary: [],
      searchBooks: "",
      searchResults: []
    }
  }

  /* Get all books in shelves */
  componentDidMount() {
    BooksAPI.getAll()
      .then((allLibraryBooks) => {
        this.setState({ booksLibrary: allLibraryBooks });
      });
  }

  /* Get an updated search result */
  queueResult = (query) => {
    this.setState({ searchBooks: query }, this.displayResults);
    // console.log(this.state.search);
  }

  displayResults = () => {
    /* Check search entry to see if it's left blank or undefined,
     * then set the search result to an empty array.
     */
    if (this.state.searchBooks === '' || this.state.searchBooks === undefined) {
      return this.setState({ searchResults: [] });
    }
    /* Get search result from running BooksAPI
     */
    BooksAPI.searchBooks(this.state.searchBooks)
      .then((result) => {
        // console.log(result);
        /* Set searchResults to an empty array if there's error */
        if (result.error) {
          return this.setState({ searchResults: [] });
        } else {
          /* Loop through search result to find book and check if
           * book is on one of the library shelves.
           */
          for (let r of result) {
            let updatedLibraryBooks = this.state.booksLibrary;
            /* Find books from searchResults and compare it to
             * books on shelves.
             */
            let foundBook = updatedLibraryBooks.find(pickBook => pickBook.id === r.id);
            // console.log(foundBook);
            if (foundBook) {
              /* Set the selected book from search to a shelf in library */
              r.shelf = foundBook.shelf;
            } else {
              /* Set book option to none if book is not found on shelf */
              r.shelf = "none";
            }
          }
          this.setState({ searchResults: result }, this.props.moveBookShelf);
        }
      });
  }

  /* Allow user to select the different options to
   * move books between shelves from the search results.
   */
  changeShelves = (event) => {
    this.queueResult(event.target.value);
    // console.log(event.target.value);
  }

  /* Move books between shelves */
  moveBookShelf = (book, shelf) => {
    /* Run update on books and shelves to compare changes */
    BooksAPI.update(book, shelf)
      .then((updatedLibraryBooks) => {
        /* Create new list of book from running update */
        updatedLibraryBooks = this.state.booksLibrary;
        /* Check for books on the new list against the one on shelves */
        let selectBook = updatedLibraryBooks.filter(currentBook => currentBook.id === book.id);
        // console.log(selectBook);
        if (selectBook) {
          /* Check if searched books are already a particular shelf */
          selectBook.shelf = shelf;
        } else {
          /* Add book to shelf */
          updatedLibraryBooks.concat(book);
        }
        // Update state with new list
        this.setState({ booksLibrary: updatedLibraryBooks });
      });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input value={this.state.searchBooks} type="text" placeholder="Search by title or author" onChange={this.changeShelves} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* Map through all books from search result and find book to add to shelves*/}
            {
              this.state.searchResults.map((book) => (<Book book={book} key={book.id} moveBookShelf={this.moveBookShelf} />))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;