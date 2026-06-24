/* Логотип — кимоно/халат для джиу-джитсу (gi).
   Рисуется currentColor, наследует цвет от контейнера. */
export default function GiLogo({ size = 24, ...props }) {
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
      {/* силуэт куртки: плечи, рукава, корпус */}
      <path d="M7 3.4 L12 5.6 L17 3.4 L20.6 6.3 L17.9 9.7 L17 9.1 L17 20.6 L7 20.6 L7 9.1 L6.1 9.7 L3.4 6.3 Z" />
      {/* левый отворот */}
      <path d="M12 5.6 L9.2 13.3 L12 14.9" />
      {/* правый отворот */}
      <path d="M12 5.6 L14.8 13.3 L12 14.9" />
      {/* пояс */}
      <path d="M7 16.1 H17" />
      {/* узел пояса */}
      <path d="M11.1 16.1 L10.5 19.1 M12.9 16.1 L13.5 19.1" />
    </svg>
  );
}
