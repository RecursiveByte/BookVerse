export interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  createdAt: string;
  reviewedBy: {
    userId: string;
    name: string;
  };
}

export interface ReviewCardProps {
  review: Review;
  currentUserId?: string | null;
  onEditReview?: (id: number) => void;
  onDeleteReview?: (id: number) => void;
}

export interface ReviewSectionProps {
  reviews: Review[];
  totalReviews: number;
  currentUserId?: string | null;
  onEditReview?: (id: number) => void;
  onDeleteReview?: (id: number) => void;
}
