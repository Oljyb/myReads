import React from 'react';
import * as BooksAPI from './BooksAPI';
import '../css/App.css';
import BooksShelf from './BooksShelf';
import BooksSearch from './BooksSearch';
import ErrorPage404 from './ErrorPage404';
import { Route, Switch, Link } from 'react-router-dom';

class BooksApp extends React.Component {

    state = {
        books: [],
        searchBooks: []
    };

    Shelves = [
        /**
         * This table list the shelves where the books are stored.
         */
        {
            "title" : "Currently Reading",
            "state" : "currentlyReading"
        },
        {
            "title" : "Want to Read",
            "state" : "wantToRead"
        },
        {
            "title" : "Read",
            "state" : "read"
        }
    ];

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        });
    }

    onShelfUpdate = (book, shelf) => {
        /**
         * function called when we update books shelves.
         */
        if (book.shelf === 'none') {
            BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf;
                this.setState(state => ({
                    books: state.books.concat([ book ])
                }));
            });
        } else {
            const index = this.state.books.map(function(x) {return x.id; }).indexOf(book.id);
            BooksAPI.update(book, shelf).then(() => {
                let books = this.state.books.slice();
                books[index].shelf = shelf;
                this.setState({ books });
            });
        }
    };

    onBookSearch = (query, maxResults) => {
        /**
         * function called when we search for a new book to store in our shelves.
         */
        BooksAPI.search(query, maxResults).then((books) => {
            let searchBooks = books.map(book => {
                let shelvedBook = {};
                let alreadyInShelf = this.state.books.some((storedBook) => {
                    if(storedBook.id === book.id ){
                        shelvedBook = storedBook;
                        return true;
                    } else {
                        return false;
                    }
                });
                if (true === alreadyInShelf) {
                    return shelvedBook;
                } else {
                    book.shelf = 'none';
                    return book;
                }
            });
            this.setState({ searchBooks });
        }).catch(() => {
            this.setState({ searchBooks: [] });
        });
    };

    render() {
        return (
            <div className="app">

                <Switch>
                    <Route path="/" exact render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                {this.Shelves.map((shelf,)=>(
                                    <BooksShelf
                                        Shelves={this.Shelves}
                                        key={shelf.state}
                                        onShelfUpdate={this.onShelfUpdate}
                                        title={shelf.title}
                                        books={this.state.books.filter(book => {
                                            return book.shelf === shelf.state;
                                        })}
                                    />
                                ))}
                            </div>
                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    )}/>

                    <Route path="/search" render={() => (
                        <BooksSearch
                            books={this.state.searchBooks}
                            onShelfUpdate={this.onShelfUpdate}
                            onBookSearch={this.onBookSearch}
                            Shelves={this.Shelves}
                        />
                    )}/>

                    <Route component={ErrorPage404}/>

                </Switch>

            </div>
        )
    }
}

export default BooksApp
