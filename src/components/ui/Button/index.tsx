// src/components/ui/Button/index.tsx
import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "warm" | "success" | "warning" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'aria-label'?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  animate?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  'aria-label': ariaLabel,
  icon,
  iconPosition = "left",
  animate = true,
  ...props
}, ref) => {

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return cn(
          "bg-primary text-white border-primary", // Tailwind классы
          "hover:bg-primary-hover hover:border-primary-hover",
          "focus:ring-primary/50",
          "disabled:bg-primary/50 disabled:border-primary/50",
          styles.buttonPrimary // CSS Module
        );
      case "accent":
        return cn(
          "bg-accent text-white border-accent",
          "hover:bg-accent-hover hover:border-accent-hover",
          "focus:ring-accent/50",
          "disabled:bg-accent/50 disabled:border-accent/50",
          styles.buttonAccent
        );
      case "warm":
        return cn(
          "bg-warm text-white border-warm",
          "hover:bg-warm-hover hover:border-warm-hover",
          "focus:ring-warm/50",
          "disabled:bg-warm/50 disabled:border-warm/50",
          styles.buttonWarm
        );
      case "secondary":
        return cn(
          "bg-secondary text-text-primary border-secondary",
          "hover:bg-gray-300 hover:border-gray-300",
          "focus:ring-gray-400/50",
          "disabled:bg-secondary/50 disabled:border-secondary/50",
          styles.buttonSecondary
        );
      case "outline":
        return cn(
          "bg-transparent border-2 border-primary text-primary",
          "hover:bg-primary hover:text-white",
          "focus:ring-primary/50",
          "disabled:border-primary/50 disabled:text-primary/50",
          styles.buttonOutline
        );
      case "ghost":
        return cn(
          "bg-transparent border-transparent text-primary",
          "hover:bg-primary/10 hover:text-primary-hover",
          "focus:ring-primary/50",
          "disabled:text-primary/50",
          styles.buttonGhost
        );
      case "success":
        return cn(
          "bg-green-600 text-white border-green-600",
          "hover:bg-green-700 hover:border-green-700",
          "focus:ring-green-500/50",
          "disabled:bg-green-600/50 disabled:border-green-600/50",
          styles.buttonSuccess
        );
      case "warning":
        return cn(
          "bg-yellow-600 text-white border-yellow-600",
          "hover:bg-yellow-700 hover:border-yellow-700",
          "focus:ring-yellow-500/50",
          "disabled:bg-yellow-600/50 disabled:border-yellow-600/50",
          styles.buttonWarning
        );
      case "danger":
        return cn(
          "bg-red-600 text-white border-red-600",
          "hover:bg-red-700 hover:border-red-700",
          "focus:ring-red-500/50",
          "disabled:bg-red-600/50 disabled:border-red-600/50",
          styles.buttonDanger
        );
      default:
        return cn(
          "bg-primary text-white border-primary",
          "hover:bg-primary-hover hover:border-primary-hover",
          "focus:ring-primary/50",
          "disabled:bg-primary/50 disabled:border-primary/50",
          styles.buttonPrimary
        );
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return cn("px-2 py-1 text-xs min-h-[1.75rem]", styles.buttonXs);
      case "sm":
        return cn("px-3 py-1.5 text-sm min-h-[2rem]", styles.buttonSm);
      case "lg":
        return cn("px-8 py-4 text-lg min-h-[3.5rem]", styles.buttonLg);
      case "xl":
        return cn("px-10 py-5 text-xl min-h-[4rem]", styles.buttonXl);
      default:
        return cn("px-6 py-3 text-base min-h-[2.75rem]", styles.buttonMd);
    }
  };

  const LoadingSpinner = () => (
    <svg
      className={cn("animate-spin h-4 w-4", styles.buttonSpinner)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={cn(
        // Base Tailwind styles
        "inline-flex items-center justify-center",
        "border font-medium rounded-lg",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "select-none relative overflow-hidden",
        
        // Size and variant classes
        getSizeClasses(),
        getVariantClasses(),
        
        // Full width
        fullWidth && "w-full",
        
        // Interactive effects (disabled when loading or disabled)
        !disabled && !loading && animate && cn(
          "hoverLift", // Глобальный hover эффект из shared.module.css
          styles.buttonInteractive
        ),
        
        // Loading state
        loading && styles.buttonLoading,
        
        // Custom className
        className,
        
        // Base button class for CSS Modules
        styles.button
      )}
      {...props}
    >
      {/* Loading state content */}
      {loading && (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span className="opacity-70">{children}</span>
        </div>
      )}
      
      {/* Normal state content */}
      {!loading && (
        <>
          {icon && iconPosition === "left" && (
            <span className={cn("flex-shrink-0", children && "mr-2", styles.buttonIcon)}>
              {icon}
            </span>
          )}
          
          <span className={styles.buttonContent}>{children}</span>
          
          {icon && iconPosition === "right" && (
            <span className={cn("flex-shrink-0", children && "ml-2", styles.buttonIcon)}>
              {icon}
            </span>
          )}
        </>
      )}
      
      {/* Shimmer effect overlay - только для не-disabled кнопок */}
      {!disabled && !loading && <div className={styles.buttonShimmer} />}
    </button>
  );
});

Button.displayName = "Button";

export default Button;