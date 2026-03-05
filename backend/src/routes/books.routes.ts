import { Router } from 'express';
const router = Router();
import { booksCount, getBooksWithReviews } from '../controllers/book.controller';
// import { authenticateUser } from '../middlewares/auth.middleware';

router.get("/bookReviews", getBooksWithReviews);
router.get("/getBookCount",booksCount)


export default router;