const sizes = {
  sm: "max-w-32 sm:max-w-40",
  md: "max-w-48 sm:max-w-64 md:max-w-80",
  lg: "max-w-64 sm:max-w-80 md:max-w-96",
};

export type LogoProps = {
  size?: keyof typeof sizes;
  alt?: string;
  className?: string;
};

export function Logo({ size = "md", alt = "", className = "" }: LogoProps) {
  return (
    <img
      src="/sisig-logo.svg"
      alt={alt}
      className={`mx-auto block h-auto w-full ${sizes[size]} ${className}`.trim()}
    />
  );
}
