interface Props {
  count?: number;
}

const BookSkeleton = () => (
  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-3 w-55 flex flex-col gap-3">
    <div className="animate-pulse h-45 w-full rounded-lg bg-[hsl(var(--primary)/0.08)]" />
    <div className="animate-pulse h-4 w-3/4 rounded-md bg-[hsl(var(--primary)/0.08)]" />
    <div className="animate-pulse h-3 w-1/2 rounded-md bg-[hsl(var(--primary)/0.08)]" />
  </div>
);

const BooksGridSkeleton = ({ count = 8 }: Props) => {
  return (
    <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      {[...Array(count)].map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
};

export default BooksGridSkeleton;