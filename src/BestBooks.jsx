import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BestBooks = ({ books, setBooks, deleteBook }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios.get(`${SERVER_URL}/books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setBooks]);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
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
            style={{ marginBottom: '10px' }}
            variant="danger" 
            className="delete-button" 
            onClick={() => deleteBook(books[activeIndex]._id)}
          >
            Delete Book
          </Button>
        </div>
      ) : (
        <h3>No Books Found :(</h3>
      )}
    </>
  );
}

export default BestBooks;
