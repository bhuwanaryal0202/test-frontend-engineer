import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice } from '@/utils/formatting';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <Card className="mb-4">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {product.title}
          </h3>
          <p className="text-gray-500 mt-1">
            {formatPrice(product.price)} each
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(Number(product.id), quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <span className="w-12 text-center font-medium">
            {quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(Number(product.id), quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-right min-w-[100px]">
          <div className="font-medium text-gray-900">
            {formatPrice(product.price * quantity)}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeItem(Number(product.id))}
            className="mt-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}