import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, Truck, Headphones, Package } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Shop with confidence with our secure payment system'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our customer service team is always here to help'
    },
    {
      icon: Package,
      title: 'Easy Returns',
      description: '30-day return policy for your peace of mind'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About E-Shop</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted destination for quality products and exceptional shopping experiences.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16 text-center">
       
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in 2024, E-Shop has grown from a small startup to one of the leading 
              e-commerce platforms. Our mission is to provide customers with the best 
              shopping experience possible.
            </p>
            <p>
              We believe in quality, convenience, and customer satisfaction. Every product 
              in our inventory is carefully selected to ensure it meets our high standards.
            </p>
            <p>
              With thousands of satisfied customers and a growing selection of products, 
              we continue to expand our offerings while maintaining our commitment to 
              excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}