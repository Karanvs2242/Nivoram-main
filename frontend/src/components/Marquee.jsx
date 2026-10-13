export default function Marquee({ items }) {
  const row = (ariaHidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display italic text-[26px] sm:text-[34px] text-ink/70 px-8 sm:px-12 whitespace-nowrap">
            {item}
          </span>
          <span
            className={`inline-block h-2 w-2 rotate-45 ${["bg-flame", "bg-lav/80", "bg-royal/60"][i % 3]}`}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y border-sand bg-cream py-5 overflow-hidden" data-testid="editorial-marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}