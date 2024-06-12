import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import BookFormModal from './BookFormModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './About';
import UserProfile from './UserProfile';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Welcome from './Welcome';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [books, setBooks] = useState([]);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchBooks = async () => {
      if (isAuthenticated) {
        try {
          const token = await getIdTokenClaims();
          const config = {
            headers: {
              'Authorization': `Bearer ${token.__raw}`,
              'User': token.email
            }
          };

          const response = await axios.get(`${SERVER_URL}/books`, config);
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      } else {
        console.log('User is not authenticated');
      }
    };

    fetchBooks();
  }, [isAuthenticated, getIdTokenClaims, setBooks]);

  const updateBooks = (newBook) => {
    setBooks([...books, newBook]); // Makes a shallow copy using spread to maintain immutability
  };

  const deleteBook = async (bookId) => {
    try {
      const token = await getIdTokenClaims();
      const config = {
        headers: {
          'Authorization': `Bearer ${token.__raw}`,
          'User': token.email
        }
      };

      await axios.delete(`${SERVER_URL}/books/${bookId}`, config);
      setBooks(books.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            exact path="/"
            element={
              isAuthenticated ? (
                <>
                  <button
                    style={{ marginTop: '10px' }}
                    onClick={() => setShowAddBookModal(true)}>Add Book</button>
                  <BookFormModal
                    show={showAddBookModal}
                    handleClose={() => setShowAddBookModal(false)}
                    updateBooks={updateBooks}
                  />
                  <BestBooks books={books} setBooks={setBooks} deleteBook={deleteBook} />
                </>
              ) : (
                <Welcome />
              )
            }
          />
          <Route path="/about" element={<Profile />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
