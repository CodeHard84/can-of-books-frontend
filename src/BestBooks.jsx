import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal'; // Adjust the path as needed

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BestBooks = ({ books, setBooks, deleteBook }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [setBooks]);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  const handleEdit = () => {
    setBookToEdit(books[activeIndex]);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setBookToEdit(null);
  };

  const updateBooks = (updatedBook) => {
    setBooks(prevBooks => {
      const index = prevBooks.findIndex(book => book._id === updatedBook._id);
      if (index !== -1) {
        const newBooks = [...prevBooks];
        newBooks[index] = updatedBook;
        return newBooks;
      } else {
        return [...prevBooks, updatedBook];
      }
    });
  };

  const handleDelete = async (bookId) => {
    try {
      deleteBook(bookId);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {books.length ? (
        <div className="book-carousel-wrapper">
          <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
            {books.map((book, index) => (
              <Carousel.Item key={index}>
                <div className="carousel-content">
                  <p>{book.title}</p>
                  <p>{book.description}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <Button
            style={{ marginBottom: '10px', marginRight: '10px' }}
            variant="secondary"
            onClick={handleEdit}
          >
            Edit Book
          </Button>
          <Button
            style={{ marginBottom: '10px' }}
            variant="danger"
            onClick={() => handleDelete(books[activeIndex]._id)}
          >
            Delete Book
          </Button>
        </div>
      ) : (
        <h3>No Books Found :( </h3>
      )}

      <BookFormModal
        show={showModal}
        handleClose={handleClose}
        updateBooks={updateBooks}
        bookToEdit={bookToEdit}
      />
    </>
  );
};

export default BestBooks;
