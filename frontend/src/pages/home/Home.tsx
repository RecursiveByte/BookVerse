import useAppNavigate from "@/hooks/useAppNavigate";
import Button from "@/components/ui/Button";

const Home = () => {
  const { toLogin, toRegister } = useAppNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative overflow-hidden flex flex-col">
      <div
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        className="absolute inset-0 opacity-40 pointer-events-none"
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-[hsl(var(--primary)/0.12)] blur-[120px] pointer-events-none" />

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] text-xs font-medium mb-6 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          Your next book is waiting
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight mb-6 max-w-4xl">
          Where readers find their next{" "}
          <span className="text-[hsl(var(--primary))]">favourite.</span>
        </h1>

        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Browse our collection of books, explore real reviews from real
          readers, and discover your next favourite read — all in one place.
        </p>

        <div className="flex items-center gap-3">
          <Button
            label="Get Started"
            variant="primary"
            onClick={toRegister}
            className="px-6"
          />
          <Button
            label="Sign In"
            variant="secondary"
            onClick={toLogin}
            className="px-6"
          />
        </div>
      </section>

      <footer className="relative z-10 border-t border-[hsl(var(--border))] py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
        © {new Date().getFullYear()} BookVerse. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
