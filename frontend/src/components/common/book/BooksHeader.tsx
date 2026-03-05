
interface BooksHeaderProps {
    currBooksLenght: number;
  }
  const BooksHeader = ({ currBooksLenght }: BooksHeaderProps) => {

    return (
      <div className="mb-8 sm:mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] text-xs font-medium mb-4 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          Showing {currBooksLenght} from the collections
        </div>
  
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          Browse the{" "}
          <span className="text-[hsl(var(--primary))]">Collection</span>
        </h2>
      </div>
    );
  };
  
  export default BooksHeader;