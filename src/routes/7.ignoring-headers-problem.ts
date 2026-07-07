import express from 'express';
import { LibraryService } from '../services/library';

const router = express.Router();
const service = new LibraryService();

router.get('/books', (req, res) => {
  const books = service.getAllBooks();
  res.json(books);
});

router.get('/authors', (req, res) => {
  const authors = service.getAllAuthors();
  res.json(authors);
});

router.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = service.getBook(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

export default router;
