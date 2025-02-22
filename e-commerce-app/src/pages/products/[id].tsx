// src/pages/products/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { api } from '@/utils/api';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/formatting';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await api.getProduct(Number(id));
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading product: {error?.message || 'Product not found'}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/products')}
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-gray-500 mt-2">{product.category}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-medium text-gray-900">
                {product.rating.rate}
              </span>
              <span className="text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={() => {
                addItem(product);
                router.push('/cart');
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
              onClick={() => router.push('/products')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}