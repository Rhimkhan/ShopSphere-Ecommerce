import React from 'react';
import Rating from '../common/Rating';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import reviewService from '../../services/reviewService';
import toast from 'react-hot-toast';

const ReviewList = ({ reviews = [], onReviewDeleted }) => {
  const { user, isAdmin } = useAuth();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id);
        toast.success('Review deleted');
        if (onReviewDeleted) onReviewDeleted();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  if (reviews.length === 0) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400 italic py-4">
        No reviews yet for this product. Be the first to leave a review!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((rev) => (
        <div
          key={rev._id}
          className="p-5 rounded-2xl bg-white dark:bg-dark-surface/60 border border-gray-100 dark:border-gray-800 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                alt={rev.userName || 'Reviewer'}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  {rev.userName || 'Verified Buyer'}
                </h4>
                <Rating value={rev.rating} size="sm" showText={false} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-gray-400 font-medium">
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>

              {(isAdmin || (user && user._id === rev.user)) && (
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                  title="Delete review"
                >
                  <FaTrash className="text-xs" />
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pl-12">
            {rev.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
