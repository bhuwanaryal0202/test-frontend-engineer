// src/pages/categories/[category].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

// Category mapping and metadata
const categoryConfig: { [key: string]: {
  title: string;
  description: string;
  image: string;
  apiCategory: string;
}} = {
  'electronics': {
    title: 'Electronics',
    description: 'Discover the latest in electronics and technology',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    apiCategory: 'electronics'
  },
  'mens-clothing': {
    title: "Men's Fashion",
    description: 'Shop the latest trends in men\'s fashion',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    apiCategory: "men's clothing"
  },
  'womens-clothing': {
    title: "Women's Fashion",
    description: 'Explore our women\'s fashion collection',
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    apiCategory: "women's clothing"
  },
  'jewelery': {
    title: 'Jewelry',
    description: 'Browse our elegant jewelry collection',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    apiCategory: 'jewelery'
  }
}


export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [priceRange, setPriceRange] = useState(1000);
  const [sortOption, setSortOption] = useState('featured');

  const categoryInfo = category ? categoryConfig[category.toString()] : null;

  useEffect(() => {
    async function fetchProducts() {
      if (!category || !categoryInfo) return;

      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const allProducts = await response.json();
        
        const filteredProducts = allProducts.filter(
          (product: Product) => 
            product.category.toLowerCase() === categoryInfo.apiCategory.toLowerCase() &&
            product.price <= priceRange
        );

        // Sort products based on selected option
        const sortedProducts = [...filteredProducts].sort((a, b) => {
          switch (sortOption) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'rating':
              return b.rating.rate - a.rating.rate;
            default:
              return 0;
          }
        });

        setProducts(sortedProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [category, categoryInfo, priceRange, sortOption]);

  if (!categoryInfo) {
    return null;
  }

  return (
    <>
      {/* Category Hero */}
      <section className="relative h-[300px]">
        <Image
          src={categoryInfo.image}
          alt={categoryInfo.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">{categoryInfo.title}</h1>
              <p className="text-gray-200">{categoryInfo.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <a href="/categories" className="text-gray-600 hover:text-blue-600">Categories</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900">{categoryInfo.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="sm:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                
                {/* Price Range */}
                <div className="border-t py-4">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$0</span>
                      <span>${priceRange}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={() => setProducts([...products])} // Trigger re-render
                >
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? 'Loading...' : `${products.length} Products`}
              </h2>
              <select
                className="border rounded-lg px-3 py-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>

            {error ? (
              <div className="text-center py-8 text-red-600">
                <p>Error: {error.message}</p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array(6).fill(null).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(categoryConfig).map(category => ({
      params: { category }
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { category: string } }) {
  const categoryInfo = categoryConfig[params.category];
  
  return {
    props: {
      title: categoryInfo?.title || 'Category',
      description: categoryInfo?.description || 'Browse products by category',
    },
  };
}