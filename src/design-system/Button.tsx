import { Icon, type IconName } from "./Icon";

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export type ButtonProps = ButtonBaseProps &
  (
    | { variant?: "text"; icon?: never }
    | { variant: "text-icon"; icon: IconName }
  );

export function Button({
  variant = "text",
  icon,
  isLoading = false,
  onClick,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      onClick={isLoading ? undefined : onClick}
      className={`text-2xl sm:text-3xl bg-[url('/src/design-system/assets/login-button.svg')] flex aspect-[564/190.5] w-48 items-center justify-center gap-2 border-0 bg-transparent bg-[length:100%_100%] bg-no-repeat sm:w-64 ${className}`.trim()}
    >
      {isLoading ? "Loading..." : children}
      {variant === "text-icon" && icon && <Icon name={icon} />}
    </button>
  );
}
