import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value = 0, numReviews, showText = true, size = 'sm', onRatingChange }) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-xl',
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(
        <FaStar
          key={i}
          className={`text-amber-400 ${sizeClasses[size]} ${onRatingChange ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => onRatingChange && onRatingChange(i)}
        />
      );
    } else if (value >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className={`text-amber-400 ${sizeClasses[size]} ${onRatingChange ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => onRatingChange && onRatingChange(i)}
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className={`text-gray-300 dark:text-gray-600 ${sizeClasses[size]} ${onRatingChange ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => onRatingChange && onRatingChange(i)}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showText && (
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {value.toFixed(1)} {numReviews !== undefined && `(${numReviews})`}
        </span>
      )}
    </div>
  );
};

export default Rating;
