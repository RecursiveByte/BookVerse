import { useState } from "react";
import ReviewCard from "./ReviewCard";
import EditReviewModal from "./EditReviewModal";
import type { ReviewSectionProps, Review } from "@/types/review.type";
// import { deleteReview } from "@/services/review.service";
// import { showError, showSuccess } from "@/utils/toast";

const ReviewsSection = ({
  reviews,
  totalReviews,
  currentUserId,
  onEditReview
  
}: ReviewSectionProps) => {

  const [editingReview, setEditingReview] = useState<Review | null>(null);



  return (
    <div className="flex-1 flex flex-col min-h-0">
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
              currentUserId={currentUserId}
              onEditReview={() => setEditingReview(review)}   
              // onDeleteReview={onDeleteReview}                 
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet.
          </p>
        )}
      </div>

      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSuccess={(updatedReview) => {
            onEditReview?.(updatedReview.reviewId);
            setEditingReview(null);
          }}
        />
      )}
    </div>
  );
};

export default ReviewsSection;