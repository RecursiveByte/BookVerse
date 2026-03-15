import { useContext, useState} from "react";
import { X, Save, Loader2, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { showError, showSuccess } from "@/utils/toast";
import { editReview } from "@/services/user.service";
import type { Review } from "@/types/review.type";

import { BooksContext } from "@/context/BookContext";

type EditReviewForm = {
  rating: number;
  comment: string;
};

const EditReviewModal = ({
  review,
  onClose
}: {
  review: Review;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
 const {selectedBook,setSelectedBook,setCurrBooks} = useContext(BooksContext);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditReviewForm>({
    defaultValues: {
      rating: review.rating,
      comment: review.comment,
    },
  });

  const onSubmit = async (data: EditReviewForm) => {
    
    try {
      setIsLoading(true);
      await editReview({
        reviewId: review.reviewId,
        rating: data.rating,
        comment: data.comment,
      });


      setSelectedBook(
        (prev) => {
          if(!prev)return null
          const updatedReviews = prev.reviews.map((ele) => {
            if (ele.reviewId === review.reviewId) {
              return {
                ...ele,
                comment: data.comment,
                rating: data.rating,
              };
            } else {
              return ele;
            }
          });
          return {
            ...prev,
            reviews: updatedReviews,
          };
        }
      )

      setCurrBooks((prev)=>
        prev.map((book)=>{
          if(book.id === selectedBook?.id){
            return {
              ...book,
              reviews:book.reviews.map((r)=>{
                if(r.reviewId === review.reviewId)
                {
                  return {
                    ...r,
                    rating:data.rating,
                    comment:data.comment
                  }
                }
                return r;
              })
            }
          }
          return book;

        })
      )

      showSuccess("Review updated successfully");


      onClose();
    } catch (error) {
      showError("Failed to update review");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-[0_0_60px_hsl(var(--primary)/0.2)] overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[hsl(var(--primary)/0.15)] flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            </div>
            <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">
              Edit Review
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.08)] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5 flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                Rating
              </label>
              <input
                type="number"
                min={1}
                max={5}
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Minimum rating is 1" },
                  max: { value: 5, message: "Maximum rating is 5" },
                  valueAsNumber: true,
                })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:border-[hsl(var(--primary)/0.5)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all"
              />
              {errors.rating && (
                <p className="text-xs text-red-400">{errors.rating.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                Comment
              </label>
              <textarea
                rows={3}
                {...register("comment", {
                  required: "Comment is required",
                })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:border-[hsl(var(--primary)/0.5)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all resize-none"
              />
              {errors.comment && (
                <p className="text-xs text-red-400">{errors.comment.message}</p>
              )}
            </div>

          </div>

          <div className="flex gap-3 px-6 py-4 border-t border-[hsl(var(--border))]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.05)] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--primary)/0.25)] hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;