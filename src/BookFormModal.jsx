import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BookFormModal = ({ show, handleClose, updateBooks, bookToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setDescription(bookToEdit.description);
      setStatus(bookToEdit.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('');
    }
  }, [bookToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (bookToEdit) {
        const response = await axios.put(`${SERVER_URL}/books/${bookToEdit._id}`, {
          title,
          description,
          status
        });
        console.log('Book updated:', response.data);
        updateBooks(response.data);
      } else {
        const response = await axios.post(`${SERVER_URL}/books`, {
          title,
          description,
          status
        });
        console.log('Book added:', response.data);
        updateBooks(response.data);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{bookToEdit ? 'Edit Book' : 'Add New Book'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="available">Available</option>
              <option value="checked out">Checked Out</option>
              <option value="reserved">Reserved</option>
            </Form.Select>
          </Form.Group>
          {/* Finally, figured it out! */}
          <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
            {bookToEdit ? 'Update Book' : 'Add Book'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookFormModal;
