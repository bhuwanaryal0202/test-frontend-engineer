import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/utils/formatting';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full hover:border-blue-500 transition-colors">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </CardTitle>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm text-gray-600">
                {product.rating.rate}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}>Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}