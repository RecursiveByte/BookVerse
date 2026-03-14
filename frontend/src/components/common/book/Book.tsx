import type { FC } from "react";
import { useState, useEffect, useContext } from "react";
import type { Book } from "@/types/book.type";
import GlowBackground from "@/components/common/Glowbackground";
import { getBooksWithReviews, getBooksCount } from "@/services/book.service";

import BooksGridSkeleton from "./BooksGridSkeleton";
import BooksHeader from "./BooksHeader";
import BooksGrid from "./BooksGrid";
import BooksPagination from "./BooksPagination";

import { BooksContext } from "@/context/BookContext";

interface BooksProps {
  onBookClick?: (book: Book) => void;
  isAdmin?: boolean;
}

const PAGE_SIZE = 8;
const FETCH_SIZE = 24;
const PAGES_PER_FETCH = FETCH_SIZE / PAGE_SIZE;

const Books: FC<BooksProps> = ({
  onBookClick,
  isAdmin = false,
}) => {

  const {currBooks,setCurrBooks} = useContext(BooksContext)

  const [page, setPage] = useState(1);
  const [upcomingBooks, setUpcomingBooks] = useState<Book[]>([]);
  const [prevUp, setPrevUp] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(PAGE_SIZE);
  const [isPrev, setIsPrev] = useState(false);
  const [lastPage, setLastPage] = useState<number | null>(null);

  const fetchBooks = async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await getBooksWithReviews(pageNumber);
      const books: Book[] = res.data?.books ?? [];
      return books;
    } catch (err) {
      console.error("Failed to fetch books", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBooksCount = async () => {
      const res = await getBooksCount();
      setLastPage(res.data.lastPage);
    };
    fetchBooksCount();
  }, []);

  useEffect(() => {
    const loadInitialBooks = async () => {
      let books: Book[] = [];

      if (page % PAGES_PER_FETCH === 1) {
        books = await fetchBooks(Math.floor(page / PAGES_PER_FETCH));
        setPrevUp(books);
      }

      if (page % PAGES_PER_FETCH === 0) {
        books = await fetchBooks(Math.floor(page / PAGES_PER_FETCH + 1));
        setUpcomingBooks(books);
      }

      if (page === 1) {
        books = await fetchBooks(1);
        setCurrBooks(books);
      }
    };

    if (
      page % PAGES_PER_FETCH === 0 ||
      page === 1 ||
      page % PAGES_PER_FETCH === 1
    ) {
      loadInitialBooks();
    }
  }, [page]);

  useEffect(() => {
    if (loading) return;

    if (page !== 1 && (page - 1) % PAGES_PER_FETCH === 0) {
      if (!isPrev) {
        setCurrBooks(upcomingBooks);
        setI(0);
        setJ(PAGE_SIZE);
      }
    }

    if (page !== 1 && page % PAGES_PER_FETCH === 0) {
      if (isPrev) {
        setCurrBooks(prevUp);
        let size = prevUp.length;
        setI(size - PAGE_SIZE);
        setJ(size);
      }
    }
  }, [page, loading]);

  const visibleBooks = currBooks.slice(i, j);

  const handleNext = () => {
    if (page === lastPage) return;

    if (currBooks.length > 0) setPage((p) => p + 1);

    const nextI = i + PAGE_SIZE;
    setI(nextI);
    setJ(Math.min(nextI + PAGE_SIZE, currBooks.length));
    setIsPrev(false);
  };

  const handlePrev = () => {
    if (page === 1) return;

    setPage((p) => p - 1);
    setIsPrev(true);

    const prevI = i - PAGE_SIZE;
    setI(prevI);
    setJ(prevI + PAGE_SIZE);
  };

  return (

    <div className="w-full min-h-screen px-10 lg:px-20 py-20 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <GlowBackground gridSize="50px" />

      <div className="relative z-10 w-full min-h-full mx-auto">
        <BooksHeader currBooksLenght={visibleBooks.length} />

        {loading ? (
          <BooksGridSkeleton count={PAGE_SIZE} />
        ) : (
          <BooksGrid
          books={visibleBooks}
          onBookClick={onBookClick}
          isAdmin={isAdmin}
          />
        )}

        <BooksPagination
          page={page}
          lastPage={lastPage}
          loading={loading}
          handlePrev={handlePrev}
          handleNext={handleNext}
          />
      </div>
    </div>
  );
};

export default Books;
