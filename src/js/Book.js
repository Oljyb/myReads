import React from 'react';

function Book (props) {
    return (
        <li>
            <div className="book">
                {props.book.image}
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{ backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={(e) => {
                                props.onShelfUpdate(props.book, e.target.value);
                            }}
                            value={props.book.shelf || "none"}>
                            <option disabled>Move to...</option>
                            {props.Shelves.map((shelf, index)=>(
                                <option
                                    key={index}
                                    value={shelf.state}>
                                    {shelf.title}
                                </option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">
                    {props.book.title}
                </div>
                <div className="book-authors">
                    {props.book.authors ? props.book.authors.join(', ') : 'None'}
                </div>
            </div>
        </li>
    )
}

export default Book;