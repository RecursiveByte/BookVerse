import { Router } from "express";
import {
  editBook,
  deleteBook,
  uploadBooksFromCSV,
  getAllUsers,
  deleteUser,
  getAllReviews,
  getStats
} from "../controllers/admin.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer";

const router = Router();

router.post("/upload-books-csv", authenticateUser, upload.single("file"), uploadBooksFromCSV);
router.put("/edit-book", authenticateUser, editBook);
router.delete("/delete-book", authenticateUser, deleteBook);
router.delete("/deleteUser", authenticateUser, deleteUser);
router.get("/getAllUsers", authenticateUser, getAllUsers);
router.get("/getAllReviews", authenticateUser, getAllReviews);
router.get("/stats", authenticateUser, getStats);

export default router;