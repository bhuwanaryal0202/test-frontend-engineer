import { useQuery } from '@apollo/client';
import { ProductGrid } from '@/components/product/ProductGrid';
import { GET_PRODUCTS } from '@/graphql/schema';
import { Product } from '@/types/product';

export default function ProductsPage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { limit: 12, offset: 0 },
  });

  const products = data?.products || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading products: {error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      <ProductGrid products={products} isLoading={loading} />
    </div>
  );
}