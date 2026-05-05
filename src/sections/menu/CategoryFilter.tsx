import React from 'react';
import { cn } from '../../lib/utils';

const categories = ['all', 'coffee', 'non-coffee', 'food', 'dessert'];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            'px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2',
            activeCategory === category
              ? 'bg-primary border-primary text-accent shadow-xl shadow-primary/20 scale-105'
              : 'border-primary/10 text-primary/60 hover:border-primary/30 hover:text-primary'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
