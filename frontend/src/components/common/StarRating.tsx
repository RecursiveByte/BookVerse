import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-3.5 h-3.5 ${
          s <= Math.round(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-[hsl(var(--border))]"
        }`}
      />
    ))}
  </div>
);

export default StarRating;