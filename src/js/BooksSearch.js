import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';
import Book from './Book';

class BooksSearch extends Component {
    state = {
        query: ''
    };

    handleChange(e) {
        let query = e.target.value;
        this.setState({ query });
        if (query.length > 0) {
            this.props.onBookSearch(query, 20);
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={300}
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(this.props.books && this.state.query.length > 0) && (
                            this.props.books.map((book) => {
                                return (
                                    <Book
                                        onShelfUpdate={this.props.onShelfUpdate}
                                        key={book.id}
                                        book={book}
                                        Shelves={this.props.Shelves}
                                    />
                                )
                            })
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BooksSearch;