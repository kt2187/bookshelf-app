import React from 'react';
import Shelf from './Shelf';
import * as BooksAPI from '../BooksAPI';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksLibrary: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
  }

  /* Get all books in shelves */
  componentDidMount() {
    BooksAPI.getAll()
      .then((allLibraryBooks) => {
        // console.log(allLibraryBooks);
        this.setState({ booksLibrary: allLibraryBooks });
        // console.log(this.state.booksLibrary);
      });
  }

  /* Move books between shelves */
  moveBookShelf = (book, shelf) => {
    /* Run update on books and shelves to compare changes */
    BooksAPI.update(book, shelf)
      .then((updatedLibraryBooks) => {
        /* Create new updated list of book from running update */
        updatedLibraryBooks = this.state.booksLibrary;
        /* Check for books on the updated list against the one on shelves */
        let selectBook = updatedLibraryBooks.filter(currentBook => currentBook.id === book.id);
        // console.log(selectBook);
        if (selectBook) {
          /* Check if searched books are already a particular shelf */
          selectBook[0].shelf = shelf;
        } else {
          /* Add book to shelf */
          updatedLibraryBooks.concat(book);
        }
        /* Update state with new list */
        this.setState({ booksLibrary: updatedLibraryBooks });
      });
  }


  render() {
    /* Filter books to chosen shelves */
    let currentlyReading = this.state.booksLibrary.filter(book => book.shelf === "currentlyReading");
    let wantToRead = this.state.booksLibrary.filter(book => book.shelf === "wantToRead");
    let read = this.state.booksLibrary.filter(book => book.shelf === "read");
    /* console.log(currentlyReading, wantToRead, read); */

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* Create shelves for categories of books */}
            <Shelf shelfName="Currently Reading" booksLibrary={currentlyReading} moveBookShelf={this.moveBookShelf} />
            <Shelf shelfName="Want to Read" booksLibrary={wantToRead} moveBookShelf={this.moveBookShelf} />
            <Shelf shelfName="Read" booksLibrary={read} moveBookShelf={this.moveBookShelf} />
          </div>
        </div>
      </div>
    )
  }

}

export default HomePage;