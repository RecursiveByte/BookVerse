import axios from "@/lib/axios"; 
import type { UserRes } from "@/types/user.type";

export interface AddReviewResponse {
  message: string;
  reviewId: number;
}

export const addReview = async (data: {
  bookId: number;
  rating: number;
  comment: string;
}): Promise<AddReviewResponse> => {
  const res = await axios.post("/review/add-review", data);
  return res.data;
};

export const editReview = (data: {
    reviewId: number;
  rating: number;
  comment: string;
}) => {
  return axios.put("/review/edit-review", data);
};

export const deleteReview = (reviewId: number) => {
  return axios.delete("/review/delete-review", {
    data: { reviewId },
  });
};

export const getUserDetails = async (): Promise<UserRes> => {
  const res = await axios.get("/auth/userDetails");
  return res.data;
};



