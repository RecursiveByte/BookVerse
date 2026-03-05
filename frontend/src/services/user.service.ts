import axios from "@/lib/axios"; 

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