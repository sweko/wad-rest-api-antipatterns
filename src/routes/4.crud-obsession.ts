import express from 'express';
import { LibraryService } from '../services/library-04';

const router = express.Router();
const service = new LibraryService();

/**
 * All other possible (and correct) actions here
 * 
 */

router.post('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { action, userId } = req.body;
  
  let result;
  switch (action) {
    case 'borrow':
      result = service.updateBookStatus(id, 'borrowed', userId);
      break;
    case 'return':
      result = service.updateBookStatus(id, 'available', null);
      break;
    case 'reserve':
      result = service.updateBookStatus(id, 'reserved', userId);
      break;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
  
  res.json(result);
});

router.post('/authors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { action } = req.body;
  
  let result;
  switch (action) {
    case 'promote':
      result = service.updateAuthorStatus(id, 'promoted');
      break;
    case 'retire':
      result = service.updateAuthorStatus(id, 'retired');
      break;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
  
  res.json(result);
});

export default router;
