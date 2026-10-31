// Each icon is a CSS background (like the button art), so the SVG stays in
// src/design-system/assets instead of /public. Class strings must stay literal
// so Tailwind can see them.
const icons = {
  faceId: "bg-[url('/src/design-system/assets/face-id.svg')]",
} as const;

const sizes = {
  sm: "size-5",
  md: "size-6 sm:size-8",
  lg: "size-12",
};

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  size?: keyof typeof sizes;
  alt?: string;
  className?: string;
};

export function Icon({ name, size = "md", alt = "", className = "" }: IconProps) {
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`block shrink-0 bg-contain bg-center bg-no-repeat ${icons[name]} ${sizes[size]} ${className}`.trim()}
    />
  );
}
