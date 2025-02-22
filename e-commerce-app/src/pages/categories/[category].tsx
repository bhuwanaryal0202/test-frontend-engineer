import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/types/product';
import { api } from '@/utils/api';
import { ProductCard } from '@/components/product/ProductCard';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const categoryMap: { [key: string]: string } = {
    'electronics': 'electronics',
    'fashion': "men's clothing",
    'fashion-women': "women's clothing",
    'jewelery': 'jewelery'
  };

  useEffect(() => {
    async function fetchProducts() {
      if (!category) return;

      try {
        setIsLoading(true);
        const allProducts = await api.getProducts();
        const mappedCategory = categoryMap[category.toString()];
        
        if (!mappedCategory) {
          throw new Error('Category not found');
        }

        const filteredProducts = allProducts.filter(
          product => product.category.toLowerCase() === mappedCategory.toLowerCase()
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-red-600">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  const categoryTitles: { [key: string]: string } = {
    'electronics': 'Electronics',
    'fashion': 'Fashion',
    'fashion-women': "Women's Fashion",
    'jewelery': 'Jewelry'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {categoryTitles[category as string] || 'Products'}
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array(4).fill(null).map((_, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Category Products',
      description: 'Browse products by category',
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'electronics' } },
      { params: { category: 'fashion' } },
      { params: { category: 'fashion-women' } },
      { params: { category: 'jewelery' } },
    ],
    fallback: false,
  };
}