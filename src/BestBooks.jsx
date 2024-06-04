import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get(`${SERVER_URL}/books`)
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map((book, index) => (
              <Carousel.Item key={index}>
                <p>{book.title}</p>
                <p>{book.description}</p>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
