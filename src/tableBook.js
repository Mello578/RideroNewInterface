/**
 * Created by Mello on 15.09.2017.
 */

/**
 * Created by Mello on 15.09.2017.
 */

import React from "react";
import {AddBook} from './addBook';
import {bookFieldNames} from './bookFieldNames';


export class TableBook extends React.Component {

    constructor() {
        super();
        this.state = {
            filterString: '',
            sortBook: false,
            isModalWindowOpened: false,
            selectedBook: null,
            books: JSON.parse(localStorage.getItem('book'))
        };
    }

    getImage(book) {
        return book.photo ? require(`base64-image-loader!../img/${book.id}.png`) : '';
    }


    getLocalStorageData() {
        return JSON.parse(localStorage.getItem('book'));
    }

    setBooks(books) {
        this.setState({books});
        localStorage.setItem('book', JSON.stringify(books));
    }

    showModalWindow(selectedBook) {
        this.setState({
            isModalWindowOpened: true,
            selectedBook
        });
    }

    deleteBook(book) {
        let books = this.state.books.filter((item) => {
            return item.id !== book.id
        });
        this.setBooks(books);
    }

    editBook(editedBook) {
        let books = this.state.books;
        let numberBookInArray = books.findIndex((item) => {
            return editedBook.id === item.id
        });
        const testEdit = (book, editBook) => {
            let differingField = 0;
            for (let key in book) {
                book[key] !== editBook[key] ? differingField++ : differingField;
            }
            return differingField;
        };
        if (testEdit(books[numberBookInArray], editedBook)) {
            books.splice(numberBookInArray, 1, editedBook);
            this.setBooks(books);
        } else {
            alert('Ни одно из полей не редактировалось');
        }

    }

    addBook(newBook) {
        if (newBook.name && newBook.author) {
            let books = this.state.books.concat(newBook);
            this.setBooks(books);
        } else {
            alert('Поля \'Книга\' и \'Автор\' - обязательны к заполнению');
        }

    }

    hideModalWindow() {
        this.setState({
            isModalWindowOpened: false
        });
    }

    refreshFilterString(event) {
        let filterString = event.target.value.toLowerCase();
        this.setState({filterString});
    }

    getFilteredTable() {
        let {allBook} = this.props;
        if (this.state.filterString) {
            return allBook.filter((item) => {
                for (let key in item) {
                    if (String(item[key]).toLowerCase().indexOf(this.state.filterString) > -1 && key !== 'id') {
                        return true;
                    }
                }

                return false;
            });
        } else {
            return this.state.books;
        }
    }


    render() {
        const bookFields = Object.keys(bookFieldNames);
        const headers = bookFields.map((fieldName) => bookFieldNames[fieldName]);
        let allBook = this.getFilteredTable();

        return (
            <div className="nullDiv">
                <div className={` blackout ${this.state.isModalWindowOpened ? 'modalVisible' : 'modalNoVisible'}`}>
                </div>
                <div className="headWorkingField">
                    <div className="filterAndButton">
                        <input type='text' placeholder='Поиск'
                               className='filterStyle'
                               onChange={(event) => this.refreshFilterString(event)}/>

                        <button type='button'
                                className='buttonStyle addButton'
                                onClick={() => this.showModalWindow(null)}>
                            Добавить книгу
                        </button>
                    </div>

                </div>
                <div>
                    <AddBook selectedBook={this.state.selectedBook}
                             visibility={this.state.isModalWindowOpened}
                             onDelete={(book) => this.deleteBook(book)}
                             onEdit={(book) => this.editBook(book)}
                             onAdd={(book) => this.addBook(book)}
                             onCancel={() => this.hideModalWindow()}/>
                    <div className="allBooks">
                        {
                            allBook.map((book, id) =>
                                <div key={id} id={'book' + id} className="book"
                                     onDoubleClick={(event) => this.showModalWindow(book)}
                                >
                                    <div className="photo" style={{
                                        background: 'url(' + this.getImage(book) + ')',
                                    backgroundSize: 'cover'}}></div>
                                    <div className="bookContent">
                                        {
                                            bookFields.map((internal, i) =>
                                                <div key={i} id={internal}> {book[internal]} </div>)
                                        }
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>


        )
    }
}