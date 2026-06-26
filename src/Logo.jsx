/* Логотип — бейсбольный мяч с фирменными швами.
   Рисуется currentColor, наследует цвет от контейнера. */
export default function Logo({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      {/* левый и правый швы */}
      <path d="M6 6 C 8.4 8.6, 8.4 15.4, 6 18" />
      <path d="M18 6 C 15.6 8.6, 15.6 15.4, 18 18" />
      {/* стежки */}
      <path d="M6.8 9 l1.5 -.55 M6.55 12 h1.6 M6.8 15 l1.5 .55" />
      <path d="M17.2 9 l-1.5 -.55 M17.45 12 h-1.6 M17.2 15 l-1.5 .55" />
    </svg>
  );
}
