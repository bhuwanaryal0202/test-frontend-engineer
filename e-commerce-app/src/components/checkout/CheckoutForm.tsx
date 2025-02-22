// src/components/checkout/CheckoutForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="firstName"
                required
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lastName"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input
              id="address"
              required
              autoComplete="street-address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Input
                id="city"
                required
                autoComplete="address-level2"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <Input
                id="state"
                required
                autoComplete="address-level1"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                ZIP
              </label>
              <Input
                id="zip"
                required
                autoComplete="postal-code"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}