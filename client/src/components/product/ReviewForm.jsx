import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import reviewService from '../../services/reviewService';
import Rating from '../common/Rating';
import toast from 'react-hot-toast';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.createReview({ productId, rating, comment });
      toast.success('Thank you! Your review has been submitted.');
      setComment('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to submit review';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-dark-surface/50 border border-gray-200/60 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          Please log in to write a review for this product.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Write a Customer Review</h4>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Your Rating
        </label>
        <Rating value={rating} onRatingChange={(r) => setRating(r)} size="lg" showText={false} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Review Comment
        </label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your detailed feedback regarding product quality, fit, or performance..."
          className="input-field text-xs py-2.5"
          required
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary text-xs py-2.5 w-full sm:w-auto">
        {submitting ? 'Submitting...' : 'Post Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
