import type { FC } from "react";
import { useState } from "react";
import BookCard from "./BookCard";
import type { Book } from "./BookCard";
import GlowBackground from "./Glowbackground";

interface BooksProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
}

const PAGE_SIZE = 8;

const ChevronLeft = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const Books: FC<BooksProps> = ({ books, onBookClick }) => {
  const [i, setI] = useState(0);
  const [j, setJ] = useState(Math.min(PAGE_SIZE, books.length));

  const totalPages = Math.ceil(books.length / PAGE_SIZE);
  const currentPage = Math.floor(i / PAGE_SIZE) + 1;

  const handleNext = () => {
    const nextI = i + PAGE_SIZE;
    const nextJ = j + PAGE_SIZE;
    if (nextI >= books.length) return;
    setI(nextI);
    setJ(Math.min(nextJ, books.length));
  };

  const handlePrev = () => {
    const prevI = i - PAGE_SIZE;
    const prevJ = Math.max(j - PAGE_SIZE, j - Math.abs(i - j));
    if (prevI < 0) return;
    setI(prevI);
    setJ(Math.min(prevJ, books.length));
  };

  const visibleBooks = books.slice(i, j);
  const isPrevDisabled = i === 0;
  const isNextDisabled = j >= books.length;

  return (
    <div className="w-screen min-h-screen px-10 lg:px-20 py-20 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
     {/* <div
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        className="absolute inset-0 opacity-40 pointer-events-none"
      /> */}
      <GlowBackground gridSize="50px" />

      <div className="relative  z-10 w-full min-h-full mx-auto  ">
        <div className="mb-8 sm:mb-10 text-center">
          <div className="inline-flex  items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] text-xs font-medium mb-4 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
            {books.length} books available
          </div>
          <h2 className="text-2xl   sm:text-3xl md:text-4xl font-black tracking-tight">
            Browse the{" "}
            <span className="text-[hsl(var(--primary))]">Collection</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]  text-sm mt-2">
            Showing {i + 1}–{j} of {books.length} books
          </p>
        </div>

        <div className="w-full mb-6">
          <div className="relative mx-auto flex justify-center w-full    ">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)] focus:border-[hsl(var(--primary))] transition-all duration-200"
            />
            <svg
              className="absolute left-3  top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {visibleBooks.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center   sm:grid-cols-3  lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {visibleBooks.map((book) => (
              <BookCard key={book.id} book={book} onClick={onBookClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col  items-center  justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl  border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8  text-[hsl(var(--muted-foreground))]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] font-medium">
              No books found
            </p>
          </div>
        )}

        {books.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-[hsl(var(--border))] pt-6">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200
                ${
                  isPrevDisabled
                    ? "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] opacity-40 cursor-not-allowed"
                    : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)] cursor-pointer"
                }`}
            >
              <ChevronLeft />
              Previous
            </button>

            <div className="flex items-center  gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const isActive = idx + 1 === currentPage;
                return (
                  <div
                    key={idx}
                    className={`rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-6 h-2 bg-[hsl(var(--primary))]"
                        : "w-2 h-2 bg-[hsl(var(--border))]"
                    }`}
                  />
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
              Page{" "}
              <span className="text-[hsl(var(--foreground))] font-bold">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="text-[hsl(var(--foreground))] font-bold">
                {totalPages}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200
                ${
                  isNextDisabled
                    ? "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] opacity-40 cursor-not-allowed"
                    : "border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.85)] cursor-pointer"
                }`}
            >
              Next
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
