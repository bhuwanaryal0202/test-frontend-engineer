// src/pages/checkout/success/index.tsx
import Link from 'next/link';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <ShoppingBag className="w-8 h-8 absolute bottom-0 right-0 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center text-3xl mt-6">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2 text-gray-600">
            <p>
              Thank you for your purchase! Your order has been successfully placed.
            </p>
            <p>
              We'll send you a confirmation email with your order details shortly.
            </p>
            <p>
              Expected delivery: 3-5 business days
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
              >
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}