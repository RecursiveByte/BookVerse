import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";

interface EmailStepProps {
  email: string;
  setEmail: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSignIn: () => void;
}

const EmailStep = ({
  email,
  setEmail,
  isLoading,
  onSubmit,
  onSignIn,
}: EmailStepProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <p className="text-sm text-[hsl(var(--muted-foreground))] text-center -mt-4 mb-2">
      Enter your email and we'll send you an OTP to reset your password.
    </p>

    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full pl-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
      />
    </div>

    <Button
      label={isLoading ? "Sending Please Wait...." :"Send OTP"  }
      disabled={isLoading}
      variant="primary"
      type="submit"
    />

    <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
      Remember your password?{" "}
      <Button label="Sign in" variant="ghost" onClick={onSignIn} />
    </p>
  </form>
);

export default EmailStep;