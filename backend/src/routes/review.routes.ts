import { Router } from "express";
import {
  addReview,
  editReview,
  deleteReview,
} from "../controllers/review.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/add-review",
  authenticateUser,
  addReview
);

router.put(
  "/edit-review",
  authenticateUser,
  editReview
);

router.delete(
  "/delete-review",
  authenticateUser,
  deleteReview
);

export default router;
