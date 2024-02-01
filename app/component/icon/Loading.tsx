export const Loading = ({
  size = 12,
  color = '#fff',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div className={`w-${size} relative`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-${size} h-${size} animate-spin animate-[spin_2s_ease_out_infinite]`}
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.3639L7.75736 16.2426M21 12.0005H18M18.364 5.63639L16.2427 7.75771M11.9998 21.0002V18.0002M18.3639 18.3642L16.2426 16.2429"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};
