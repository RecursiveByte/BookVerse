import useAppNavigate from "@/hooks/useAppNavigate";
import Button from "@/components/ui/Button";
import GlowBackground from "@/components/common/Glowbackground";

const Home = () => {
  const { toLogin, toRegister } = useAppNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative overflow-hidden flex flex-col">
      <GlowBackground gridSize="80px" glowHeight="200px" glowWidth="200px" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-[hsl(var(--primary)/0.12)] blur-[120px] pointer-events-none" />

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="mb-2 mt-20 lg:mt-0 max-w-3xl rounded-xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-3 text-sm text-[hsl(var(--foreground))]">
          <span className="font-semibold text-[hsl(var(--primary))]">
            NOTE:
          </span>{" "}
          The backend service is hosted on a free-tier platform, and the monthly
          quota has been exhausted. Please refer to the Loom video for a
          complete demonstration.
          <a
            href="https://www.loom.com/share/e28b1a0bfac2406da3af95acb37d788f"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 font-medium text-[hsl(var(--primary))] hover:underline"
          >
            Watch Demo
          </a>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] text-xs font-medium mb-3 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          Your next book is waiting
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight mb-6 max-w-4xl">
          Where readers find their next{" "}
          <span className="text-[hsl(var(--primary))]">favourite.</span>
        </h1>

        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Browse our collection of books, explore real reviews from real
          readers, and discover your next favourite read all in one place.
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
