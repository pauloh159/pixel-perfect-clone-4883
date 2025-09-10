import React from 'react';

interface StarRatingProps {
  rating?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating = 5, className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="star"
        >
          <path
            d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
            fill={index < rating ? "url(#paint0_linear)" : "#D1D5DB"}
          />
          <defs>
            <linearGradient id="paint0_linear" x1="20" y1="1.94187" x2="0" y2="18.0581" gradientUnits="userSpaceOnUse">
              <stop offset="0.243378" stopColor="#EFEFA6" />
              <stop offset="0.464292" stopColor="#F7C41D" />
              <stop offset="0.803059" stopColor="#FBB967" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
};
