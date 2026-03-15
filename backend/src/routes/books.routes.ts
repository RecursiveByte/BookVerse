import { Router } from 'express';
const router = Router();
import { booksCount, getBooksWithReviews } from '../controllers/book.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

router.get("/bookReviews", authenticateUser, getBooksWithReviews);
router.get("/getBookCount",authenticateUser,booksCount)


export default router;