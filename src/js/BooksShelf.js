import React from 'react';
import Book from './Book';

function BooksShelf (props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) => {
                        return (
                            <Book
                                onShelfUpdate={props.onShelfUpdate}
                                key={book.id}
                                book={book}
                                Shelves={props.Shelves}
                            />
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default BooksShelf;
