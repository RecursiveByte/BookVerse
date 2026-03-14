import { useContext, useState } from "react";
import ReviewCard from "./ReviewCard";
import EditReviewModal from "./EditReviewModal";
import AddReviewModal from "./AddReviewModal";
import type { ReviewSectionProps, Review } from "@/types/review.type";
import { deleteReview } from "@/services/user.service";
import { showError, showSuccess } from "@/utils/toast";
import { BooksContext } from "@/context/BookContext";
import { Plus } from "lucide-react";

const ReviewsSection = ({
  reviews,
  totalReviews,
}: ReviewSectionProps) => {



  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const { selectedBook,setSelectedBook,setCurrBooks } = useContext(BooksContext);

  const handleDeleteReview = async (reviewId: number) => {
    try {

      // console.log(reviewId)
      await deleteReview(reviewId);
      setSelectedBook((prev) => {
        if (!prev) return null;
        const updatedReviews = prev.reviews.filter(ele => ele.reviewId !== reviewId);
        return {
          ...prev,
          reviews: updatedReviews,
        };
      });

      setCurrBooks((prev)=>
         prev.map((book)=>{
          if(book.id == selectedBook?.id){
            return {
              ...book,
              reviews:book.reviews.filter(r => r.reviewId != reviewId)
            }
          }
          return book;
        })
      )

      showSuccess("Review deleted successfully");
    } catch (error) {
      showError("Failed to delete review");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto min-h-0">

      <div className="px-8 py-5 border-b border-[hsl(var(--border))]">
        <h3 className="text-lg font-semibold">
          Reviews ({totalReviews})
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {reviews.length ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
              onEditReview={() => setEditingReview(review)}
              onDeleteReview={handleDeleteReview}
            />
          ))
        ) : (
          <p className="text-center text-[hsl(var(--muted-foreground))] py-8">
            No reviews yet. Be the first to review!
          </p>
        )}

        <button
          onClick={() => setIsAddingReview(true)}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.08)] hover:border-[hsl(var(--primary)/0.5)] hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] text-sm font-medium transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
        />
      )}

      {isAddingReview && (
        <AddReviewModal
          onClose={() => setIsAddingReview(false)}
        />
      )}

    </div>
  );
};

export default ReviewsSection;