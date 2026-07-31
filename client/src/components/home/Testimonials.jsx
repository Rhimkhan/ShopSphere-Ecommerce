import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Sarah Jenkins',
    role: 'Verified Buyer',
    comment: 'ShopSphere delivered my wireless headphones in less than 24 hours. The packaging and noise cancellation quality are unmatched!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Marcus Chen',
    role: 'Tech Enthusiast',
    comment: 'The product comparison feature saved me hours of research. Customer service answered my query in minutes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Elena Rostova',
    role: 'Interior Designer',
    comment: 'Ordered furniture and home appliances for a client project. Flawless tracking and pdf invoice download for billing!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
];

const Testimonials = () => {
  return (
    <section className="mb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
          Loved by Shoppers Worldwide
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
          Read real experiences from thousands of satisfied customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-6 relative flex flex-col justify-between border border-gray-200/60 dark:border-gray-800"
          >
            <FaQuoteLeft className="text-primary-400/30 text-4xl absolute top-4 right-4" />
            <div className="space-y-3">
              <div className="flex text-amber-400 text-xs">
                {Array.from({ length: rev.rating }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{rev.name}</h4>
                <span className="text-[10px] text-gray-400 font-medium">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
