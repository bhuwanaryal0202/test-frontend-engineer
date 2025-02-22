import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatting';
import { useCart } from '@/context/CartContext';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-500 mt-1">{product.category}</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-medium">
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

        <Button
          onClick={() => addItem(product)}
          size="lg"
          className="w-full md:w-auto"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}