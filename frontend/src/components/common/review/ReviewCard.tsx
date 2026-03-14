import { User, Pencil, Trash2 } from "lucide-react";
import StarRating from "@/components/common/StarRating";
import type { ReviewCardProps } from "@/types/review.type";
import { useUser } from "@/hooks/useUser";

const ReviewCard = ({
  review,
  onEditReview,
  onDeleteReview,
}: ReviewCardProps) => {

  const user = useUser();

  const isOwner =
    user?.id &&
    String(review.reviewedBy.userId) === String(user?.id);
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--input))] hover:border-[hsl(var(--primary)/0.3)] transition-colors">
      
      <div className="w-9 h-9 rounded-full bg-[hsl(var(--primary)/0.15)] flex items-center justify-center shrink-0">
        <User className="w-4 h-4 text-[hsl(var(--primary))]" />
      </div>

      <div className="flex-1 flex flex-col gap-1.5">
        
        <div className="flex items-center justify-between">
          
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
            {review.reviewedBy.name}
          </span>

          <div className="flex items-center gap-2">
            
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {new Date(review.createdAt).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric", year: "numeric" }
              )}
            </span>

            {isOwner && (
              <div className="flex items-center gap-1">
                
                <button
                  onClick={() => onEditReview?.(review.reviewId)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg
                    text-[hsl(var(--primary)/0.6)] border border-transparent
                    hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.12)]
                    hover:border-[hsl(var(--primary)/0.3)] hover:shadow-[0_0_10px_hsl(var(--primary)/0.4)]
                    transition-all duration-200"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteReview?.(review.reviewId)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg
                    text-red-400/60 border border-transparent
                    hover:text-red-400 hover:bg-red-500/10
                    hover:border-red-500/30 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]
                    transition-all duration-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>
            )}

          </div>
        </div>

        <StarRating rating={review.rating} />

        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mt-0.5">
          {review.comment}
        </p>

      </div>
    </div>
  );
};

export default ReviewCard;