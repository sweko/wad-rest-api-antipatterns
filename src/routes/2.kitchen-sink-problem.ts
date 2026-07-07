import express from 'express';
import { LibraryService } from '../services/library';

const router = express.Router();
const service = new LibraryService();

router.get('/books', (req, res) => {
  const books = service.getBooks();
  res.json(books); // Returns all fields for all books
});

router.get('/authors', (req, res) => {
  const authors = service.getAuthors();
  res.json(authors); // Returns all fields for all authors
});

router.get('/author/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const author = service.getAuthor(id);
  if (!author) {
    res.status(404).send('Author not found');
    return;
  }
  const nationality = service.getNationality(author.nationalityId);
  const books = service.getBooksByAuthor(id);
  const series = service.getSeriesByAuthor(id);

  res.json({
    author,
    nationality,
    books,
    series
  }); // Returns all fields related to the author
});

router.get('/series', (req, res) => {
  const series = service.getAllSeries();
  res.json(series); // Returns all fields for all series
});

export default router;
