import React from 'react';

class Book extends React.Component {
  /* Check props that were given */
  // componentDidMount() {
  //  console.log(this);
  // }

  changeShelves = (event) => {
    this.props.moveBookShelf(this.props.book, event.target.value)
    // console.log(event.target.value);
  }

  render() {
    /* Remove hard coded title, author, and image thumbnail*/
    let title = this.props.book.title;
    let authors = this.props.book.authors;
    let imageURL = this.props.book.imageLinks;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${!imageURL ? "" : imageURL.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={this.changeShelves}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{!authors ? "Unknown" : authors[0]}</div>
        </div>
      </li>
    )
  }

}

export default Book;