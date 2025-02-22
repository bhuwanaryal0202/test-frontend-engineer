import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatting';
import Image from 'next/image';

export function CheckoutSummary() {
  const { items, itemCount, total } = useCart();

  const shipping = 0; // Free shipping
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.product.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({itemCount} items)</span>
              <span className="font-medium text-gray-900">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Tax</span>
              <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-base font-bold text-gray-900">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 p-4 rounded-lg text-sm">
            <p className="text-gray-600">
              Expected delivery: 3-5 business days
            </p>
            <p className="text-gray-600 mt-1">
              Free shipping on all orders
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}