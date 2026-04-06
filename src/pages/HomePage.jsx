// HomePage - Hauptkomponente für die Startseite
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { memo, useMemo } from 'react';

export const HomePage = memo(function HomePage({ 
  products, 
  categories, 
  activeCategory, 
  onCategoryChange, 
  onAddToCart 
}) {
  // Gefilterte Produkte basierend auf aktiver Kategorie
  const filteredProducts = useMemo(() => 
    activeCategory === 'All'
      ? products
      : products.filter(product => product.category === activeCategory),
    [activeCategory, products]
  );

  return (
    <main className="main-container">
      <div className="top-section">
        <div className="welcome-text">
          <h2>Welcome to TechShop</h2>
          <p>Discover the latest tech products at great prices</p>
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      <section className="products-section">
        <h3>{activeCategory === 'All' ? 'All Products' : activeCategory} ({filteredProducts.length})</h3>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </main>
  );
});
