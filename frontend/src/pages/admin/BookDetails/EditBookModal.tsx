import { useState } from "react";
import { X, BookOpen, Save, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { showError, showSuccess } from "@/utils/toast";
import { editBook } from "@/services/admin.service";
import type { Book } from "@/types/book.type";

type EditBookForm = {
  title: string;
  author: string;
  year: number;
};

const EditBookModal = ({
  book,
  onClose,
}: {
  book: Book;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBookForm>({
    defaultValues: {
      title: book.title,
      author: book.author,
      year: book.year,
    },
  });

  const onSubmit = async (data: EditBookForm) => {
    setIsLoading(true);
    try {
      await editBook(book.id, data);
      showSuccess("Book updated successfully");
      onClose();
    } catch (error) {
      showError("Failed to update book");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-[0_0_60px_hsl(var(--primary)/0.2)] overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[hsl(var(--primary)/0.15)] flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            </div>
            <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">Edit Book</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.08)] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5 flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:border-[hsl(var(--primary)/0.5)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all"
              />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Author</label>
              <input
                {...register("author", { required: "Author is required" })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:border-[hsl(var(--primary)/0.5)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all"
              />
              {errors.author && <p className="text-xs text-red-400">{errors.author.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Year</label>
              <input
                type="number"
                {...register("year", {
                  required: "Year is required",
                  min: { value: 1000, message: "Invalid year" },
                  max: { value: new Date().getFullYear(), message: "Year can't be in the future" },
                  valueAsNumber: true,
                })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:border-[hsl(var(--primary)/0.5)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all"
              />
              {errors.year && <p className="text-xs text-red-400">{errors.year.message}</p>}
            </div>

          </div>

          <div className="flex gap-3 px-6 py-4 border-t border-[hsl(var(--border))]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.05)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--primary)/0.25)] hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditBookModal;