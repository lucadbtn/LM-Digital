const heights = [40, 70, 55, 90, 60, 100, 45, 80, 65, 95, 50, 75, 85, 60, 100, 40, 70, 55];

export function Colonnade({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 50 + 6}
          y={100 - h}
          width="10"
          height={h}
          className="fill-steel/10"
        />
      ))}
    </svg>
  );
}
