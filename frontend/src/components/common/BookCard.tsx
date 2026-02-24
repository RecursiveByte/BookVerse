import type { FC } from "react";

export interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  genre?: string;
  rating?: number;
}

interface BookCardProps {
  book: Book;
  onClick?: (book: Book) => void;
}

const StarIcon = () => (
  <svg
    className="w-3 h-3 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const BookCard: FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(book)}
      className="group relative flex flex-col w-45 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[hsl(var(--primary)/0.5)] hover:shadow-[0_0_24px_hsl(var(--primary)/0.1)] hover:-translate-y-1"
    >
      <div className="relative w-full h-55 overflow-hidden bg-[hsl(var(--input))]">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/300x450/0d1f16/2ecc71?text=No+Cover";
          }}
        />
        {book.genre && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[hsl(var(--background)/0.85)] border border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))] text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
            {book.genre}
          </div>
        )}
        <div className="absolute inset-0 bg-[hsl(var(--primary)/0)] group-hover:bg-[hsl(var(--primary)/0.05)] transition-colors duration-300" />
      </div>

      <div className="flex flex-col gap-1 p-2 flex-1">
        <h3 className="text-[hsl(var(--foreground))] font-bold text-xs leading-snug line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-[hsl(var(--muted-foreground))] text-[10px] font-medium truncate">
          {book.author}
        </p>
        {book.rating !== undefined && (
          <div className="flex items-center gap-1 mt-auto pt-1">
            <StarIcon />
            <span className="text-[hsl(var(--foreground))] text-[10px] font-semibold">
              {book.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--primary))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

export default BookCard;