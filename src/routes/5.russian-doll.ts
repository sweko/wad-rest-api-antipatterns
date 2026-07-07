import express from 'express';
import { LibraryService } from '../services/library';

const router = express.Router();
const service = new LibraryService();

router.get('/libraries/:libraryId/floors/:floorId/sections/:sectionId/shelves/:shelfId/books', (req, res) => {
  const { libraryId, floorId, sectionId, shelfId } = req.params;
  const books = service.getBooksByShelf(libraryId, floorId, sectionId, shelfId);
  res.json(books);
});

router.get('/authors/:authorId/books/:bookId/chapters/:chapterId/pages/:pageId/paragraphs/:paragraphId', (req, res) => {
  const { authorId, bookId, chapterId, pageId, paragraphId } = req.params;
  const paragraph = service.getParagraph(authorId, bookId, chapterId, pageId, paragraphId);
  res.json(paragraph);
});

export default router;
