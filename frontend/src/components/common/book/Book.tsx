// import type { FC } from "react";
// import { useState, useEffect, useContext, useRef } from "react";
// import type { Book } from "@/types/book.type";
// import GlowBackground from "@/components/common/Glowbackground";
// import { getBooksWithReviews, getBooksCount } from "@/services/book.service";
// import BooksGridSkeleton from "./BooksGridSkeleton";
// import BooksHeader from "./BooksHeader";
// import BooksGrid from "./BooksGrid";
// import BooksPagination from "./BooksPagination";
// import { BooksContext } from "@/context/BookContext";

// interface BooksProps {
//   isAdmin?: boolean;
// }

// const PAGE_SIZE = 8;
// const FETCH_SIZE = 24;

// const Books: FC<BooksProps> = ({ isAdmin = false }) => {
//   const { currBooks, setCurrBooks } = useContext(BooksContext);

//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [lastPage, setLastPage] = useState<number | null>(null);

//   const allBooks = useRef<Book[]>([]);
//   const fetchedUpTo = useRef(0);
//   const initialized = useRef(false);

//   const fetchBooks = async (fetchPage: number) => {
//     setLoading(true);
//     try {
//       const res = await getBooksWithReviews(fetchPage);
//       const books: Book[] = res.data?.books ?? [];
//       allBooks.current = [...allBooks.current, ...books];
//       fetchedUpTo.current = fetchPage;
//     } catch (err) {
//       console.error("Failed to fetch books", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       const res = await getBooksCount();
//       setLastPage(res.data.lastPage);
//       await fetchBooks(1);
//       setCurrBooks(allBooks.current.slice(0, PAGE_SIZE));
//       initialized.current = true;
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     if (!initialized.current) return;

//     const startIdx = (page - 1) * PAGE_SIZE;
//     const endIdx = startIdx + PAGE_SIZE;
//     const needFetchPage = Math.ceil(endIdx / FETCH_SIZE);

//     const loadAndSet = async () => {
//       if (needFetchPage > fetchedUpTo.current) {
//         await fetchBooks(needFetchPage);
//       }
//       setCurrBooks(allBooks.current.slice(startIdx, endIdx));
//     };

//     loadAndSet();
//   }, [page]);

//   const handleNext = () => {
//     if (page === lastPage) return;
//     setPage((p) => p + 1);
//   };

//   const handlePrev = () => {
//     if (page === 1) return;
//     setPage((p) => p - 1);
//   };

//   return (
//     <div className="w-full min-h-screen px-10 lg:px-20 py-20 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
//       <GlowBackground gridSize="50px" />

//       <div className="relative z-10 w-full min-h-full mx-auto">
//         <BooksHeader currBooksLenght={currBooks.length} />

//         {loading ? (
//           <BooksGridSkeleton count={PAGE_SIZE} />
//         ) : (
//           <BooksGrid
//             books={currBooks}
//             isAdmin={isAdmin}
//           />
//         )}

//         <BooksPagination
//           page={page}
//           lastPage={lastPage}
//           loading={loading}
//           handlePrev={handlePrev}
//           handleNext={handleNext}
//         />
//       </div>
//     </div>
//   );
// };

// export default Books;


import type { FC } from "react";
import { useState, useEffect, useContext, useRef } from "react";
import type { Book } from "@/types/book.type";
import GlowBackground from "@/components/common/Glowbackground";
import { getBooksWithReviews, getBooksCount } from "@/services/book.service";
import BooksGridSkeleton from "./BooksGridSkeleton";
import BooksHeader from "./BooksHeader";
import BooksGrid from "./BooksGrid";
import BooksPagination from "./BooksPagination";
import { BooksContext } from "@/context/BookContext";

interface BooksProps {
  isAdmin?: boolean;
}

const PAGE_SIZE = 8;
const FETCH_SIZE = 24;
const DEBOUNCE_MS = 400;

const Books: FC<BooksProps> = ({ isAdmin = false }) => {
  const { currBooks, setCurrBooks } = useContext(BooksContext);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const allBooks = useRef<Book[]>([]);
  const fetchedUpTo = useRef(0);
  const initialized = useRef(false);

  const resetCache = () => {
    allBooks.current = [];
    fetchedUpTo.current = 0;
    initialized.current = false;
    setPage(1);
    setCurrBooks([]);
  };

  const fetchBooks = async (fetchPage: number, searchTerm?: string) => {
    setLoading(true);
    try {
      const res = await getBooksWithReviews(fetchPage, searchTerm);
      const books: Book[] = res.data?.books ?? [];
      allBooks.current = [...allBooks.current, ...books];
      fetchedUpTo.current = fetchPage;
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    resetCache();

    const init = async () => {
      const res = await getBooksCount(debouncedSearch || undefined);
      setLastPage(res.data.lastPage);
      await fetchBooks(1, debouncedSearch || undefined);
      setCurrBooks(allBooks.current.slice(0, PAGE_SIZE));
      initialized.current = true;
    };
    init();
  }, [debouncedSearch]);

  useEffect(() => {
    if (!initialized.current) return;

    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const needFetchPage = Math.ceil(endIdx / FETCH_SIZE);

    const loadAndSet = async () => {
      if (needFetchPage > fetchedUpTo.current) {
        await fetchBooks(needFetchPage, debouncedSearch || undefined);
      }
      setCurrBooks(allBooks.current.slice(startIdx, endIdx));
    };

    loadAndSet();
  }, [page]);

  const handleNext = () => {
    if (page === lastPage) return;
    setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage((p) => p - 1);
  };

  return (
    <div className="w-full min-h-screen px-10 lg:px-20 py-20 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <GlowBackground gridSize="50px" />

      <div className="relative z-10 w-full min-h-full mx-auto">
        <BooksHeader
          currBooksLenght={currBooks.length}
          search={search}
          onSearchChange={setSearch}
        />

        {loading ? (
          <BooksGridSkeleton count={PAGE_SIZE} />
        ) : (
          <BooksGrid
            books={currBooks}
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