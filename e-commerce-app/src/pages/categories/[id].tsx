import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

interface CategoryPageProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/categories/${id}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  return (
    <>
      {/* Category Hero */}
      <section className="relative h-[300px]">
        <Image
          src={category?.image || '/categories/default.jpg'}
          alt={category?.name || 'Category'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">{category?.name}</h1>
              <p className="text-gray-200">{category?.description}</p>
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
            <span className="text-gray-900">{category?.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>$1000</span>
                  </div>
                </div>
              </div>

              {/* Other Filters */}
              <div className="border-t py-4">
                <h3 className="font-medium mb-2">Brand</h3>
                {/* Add checkboxes for brands */}
              </div>

              <div className="border-t py-4">
                <h3 className="font-medium mb-2">Rating</h3>
                {/* Add star rating filters */}
              </div>

              <Button className="w-full mt-4">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? 'Loading...' : `${products.length} Products`}
              </h2>
              <select className="border rounded-lg px-3 py-2">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeleton
                Array(6).fill(null).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))
              ) : (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Replace with your actual categories
  const categories = ['electronics', 'fashion', 'home-living', 'beauty', 'sports', 'books'];
  
  return {
    paths: categories.map((id) => ({ params: { id } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Replace with your actual API call
  const category = {
    id: params.id,
    name: params.id.charAt(0).toUpperCase() + params.id.slice(1).replace('-', ' & '),
    description: `Explore our ${params.id} collection`,
    image: `/categories/${params.id}.jpg`,
  };

  return {
    props: {
      category,
      title: category.name,
      description: category.description,
    },
    revalidate: 60,
  };
} 