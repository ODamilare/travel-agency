type LogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: 40,
    md: 60,
    lg: 90,
  };

  const px = sizes[size];

  return (
    <img
      src="/logo.png"
      alt="Logo"
      style={{
        width: px,
        height: px,
        objectFit: "contain",
      }}
    />
  );
}