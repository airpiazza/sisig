export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({
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
      className={`text-2xl sm:text-3xl bg-[url('/src/design-system/assets/login-button.svg')] flex aspect-[564/190.5] w-48 items-center justify-center border-0 bg-transparent bg-[length:100%_100%] bg-no-repeat sm:w-64 ${className}`.trim()}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
