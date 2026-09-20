type BrandLogoProps = {
  variant?: "mark" | "wordmark";
  className?: string;
};

export default function BrandLogo({ variant = "wordmark", className = "" }: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <span className={`brand-logo-mark ${className}`} aria-label="Ascend">
        <img src="/branding/App%20logo.png" alt="" aria-hidden="true" />
      </span>
    );
  }

  return <img src="/branding/ascend-logo.png" alt="Ascend" className={`brand-logo-wordmark ${className}`} />;
}
