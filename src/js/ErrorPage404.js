import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class errErrorPage404 extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">404 page not found</h2>
                    <p>We are sorry but the page you are looking for does not exist.</p>
                    <Link className="close-search" to="/">Get back to your book's shelves</Link>
                </div>
            </div>
        )
    }
}

export default errErrorPage404;
