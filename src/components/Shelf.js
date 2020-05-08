import React from 'react';
import Book from './Book';

class Shelf extends React.Component {
  /* Check props that were given */
  // componentDidMount() {
  // 	console.log(this);
  // }

  render() {
    return (
      <div className="bookshelf">
        {/* Change shelf name dynamically */}
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* Map through all books to add to shelves*/}
            {
              this.props.booksLibrary.map((book) => (<Book book={book} key={book.id} moveBookShelf={this.props.moveBookShelf} />))
            }
          </ol>
        </div>
      </div>
    )
  }

}

export default Shelf;