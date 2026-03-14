import { ChevronLeft,ChevronRight } from "../ChevronIcons";

interface Props {
  page: number;
  lastPage: number | null;
  loading: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}

const BooksPagination = ({
  page,
  lastPage,
  loading,
  handlePrev,
  handleNext,
}: Props) => {
  return (
    <div className="flex items-center justify-between border-t border-[hsl(var(--border))] pt-6">
      <button
        onClick={handlePrev}
        disabled={loading || page == 1}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm disabled:opacity-40 disabled:cursor-not-allowed"      >
        <ChevronLeft /> Previous
      </button>

      <div className="text-sm text-[hsl(var(--muted-foreground))]">
        Page{" "}
        <span className="font-bold text-[hsl(var(--foreground))]">{page}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={loading || page === lastPage}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm disabled:opacity-40 disabled:cursor-not-allowed"      >
        Next <ChevronRight />
      </button>
    </div>
  );
};

export default BooksPagination;