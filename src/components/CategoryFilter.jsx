// CategoryFilter Component - Kategorien zum Filtern
import { memo } from 'react';

export const CategoryFilter = memo(function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
});
