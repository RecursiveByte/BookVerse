interface ButtonProps {
  label: string;
  variant: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const styles = {
  primary:
    "bg-[hsl(var(--primary))] w-full h-11 text-[hsl(var(--primary-foreground))] whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "w-full h-11 border border-[hsl(var(--border))] bg-[hsl(var(--input))] whitespace-nowrap text-[hsl(var(--foreground))] text-sm font-medium px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.1)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "text-xs text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] hover:underline transition-colors bg-transparent border-none outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  type = "button",
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles[variant]} ${className ?? ""}`}
    >
      {label}
    </button>
  );
};

export default Button;