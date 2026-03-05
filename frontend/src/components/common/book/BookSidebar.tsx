import { BookOpen, Pencil, Trash2 } from "lucide-react";
import StarRating from "@/components/common/StarRating";
import type { BookSidebarProps } from "@/types/book.type";

const BookSidebar = ({
  book,
  avgRating,
  isAdmin,
  onEdit,
  onDelete,
}: BookSidebarProps) => {
  return (
    <div className="sm:w-[320px] shrink-0 flex flex-col items-center gap-6 p-8 border-r border-[hsl(var(--border))] bg-[hsl(var(--primary)/0.03)]">

      <div className="w-48 h-64 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--border))] flex items-center justify-center shadow-lg">
        {book.image_url ? (
          <img
            src={book.image_url}
            alt={book.title}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <BookOpen className="w-16 h-16 text-[hsl(var(--primary)/0.4)]" />
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
        <p className="text-xs text-muted-foreground">{book.year}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <StarRating rating={avgRating} />
        <p className="text-3xl font-bold">
          {avgRating > 0 ? avgRating.toFixed(1) : "—"}
        </p>
        <p className="text-xs text-muted-foreground">
          {book.totalReviews} reviews
        </p>
      </div>

      {isAdmin && (
  <div className="flex gap-3 sm:mt-auto w-full">
    <button
      onClick={onEdit}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg 
      bg-[hsl(var(--primary)/0.1)] 
      text-[hsl(var(--primary))] 
      border border-[hsl(var(--primary)/0.3)] 
      hover:bg-[hsl(var(--primary)/0.2)] 
      text-sm font-medium transition-colors"
    >
      <Pencil className="w-3.5 h-3.5" />
      Edit
    </button>

    <button
      onClick={onDelete}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg 
      bg-red-500/10 
      text-red-400 
      border border-red-500/20 
      hover:bg-red-500/20 
      text-sm font-medium transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
      Delete
    </button>
  </div>
)}
    </div>
  );
};

export default BookSidebar;