import { useEffect, useState } from "react";
import type { Book } from "@/types/book.type";
import { getBooksWithReviews, getBooksCount } from "@/services/book.service";
import { BOOKS_PAGINATION } from "@/constants/books";

export const useBooksPagination = () => {

    
const {PAGE_SIZE,PAGES_PER_FETCH} = BOOKS_PAGINATION;


  const [page, setPage] = useState(1);
  const [currBooks, setCurrBooks] = useState<Book[]>([]);
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
      return res.data?.books ?? [];
    } catch {
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

        const size = prevUp.length;
        setI(size - PAGE_SIZE);
        setJ(size);
      }
    }
  }, [page, loading]);

  const visibleBooks = currBooks.slice(i, j);

  const nextPage = () => {
    if (page === lastPage) return;

    setPage((p) => p + 1);

    const nextI = i + PAGE_SIZE;
    setI(nextI);
    setJ(Math.min(nextI + PAGE_SIZE, currBooks.length));

    setIsPrev(false);
  };

  const prevPage = () => {
    if (page === 1) return;

    setPage((p) => p - 1);

    const prevI = i - PAGE_SIZE;
    setI(prevI);
    setJ(prevI + PAGE_SIZE);

    setIsPrev(true);
  };

  return {
    page,
    lastPage,
    loading,
    visibleBooks,
    currBooks,
    nextPage,
    prevPage,
  };
};