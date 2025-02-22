import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatting';
import { CartItem } from '@/types/cart';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity: updateItemQuantity, removeItem, clearCart } = useCart();

  const subtotal = items.reduce((total: number, item: CartItem) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/products')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item: CartItem) => (
            <div
              key={item.product.id}
              className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  fill
                  className="object-contain"
                  sizes="96px"
                  priority={false}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate">{item.product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.product.category}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItemQuantity(Number(item.product.id), item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(Number(item.product.id), item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(Number(item.product.id))}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                <p className="text-sm text-gray-600">
                  {formatPrice(item.product.price)} each
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/products')}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-gray-600">
                  Free shipping on orders over {formatPrice(100)}
                </p>
              )}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full mt-6"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Shopping Cart',
      description: 'View and manage your shopping cart',
    },
  };
}