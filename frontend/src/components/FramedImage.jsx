/**
 * FramedImage — shows the FULL photo inside a fixed-ratio frame.
 *
 * The photo floats centered (object-contain, so nothing is ever cropped)
 * while a softly blurred, enlarged copy of itself fills the frame behind
 * it — the premium catalogue treatment for photos whose shape doesn't
 * match a wide banner or card.
 */
export default function FramedImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  eager = false,
  children,
}) {
  const loading = eager ? undefined : "lazy";
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={loading}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-[1.6] opacity-40 select-none pointer-events-none"
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        draggable={false}
        className={`absolute inset-0 w-full h-full object-contain ${imgClassName}`}
      />
      {children}
    </div>
  );
}
