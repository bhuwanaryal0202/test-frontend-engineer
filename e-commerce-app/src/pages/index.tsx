import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Truck, Shield, Star, Clock, Gift } from 'lucide-react';
import { Product } from '@/types/product';
import { api } from '@/utils/api';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatting';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await api.getProducts();
        setFeaturedProducts(products.slice(0, 4));
        setTrendingProducts(products.slice(4, 8));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight">
                Discover Amazing Products for Your Lifestyle
              </h1>
              <p className="text-xl text-blue-100">
                Shop the latest trends with up to 50% off on selected items.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/hero-banner.jpg"
                alt="Hero Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
              { name: 'Fashion', image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg' },
              { name: 'Home & Living', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
              { name: 'Beauty', image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg' }
            ].map((category) => (
              <Link 
                key={category.name} 
                href={`/categories/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-110 p-4 bg-white"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              href="/products" 
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {isLoading
              ? Array(4).fill(null).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                Limited Time Offer
              </span>
              <h2 className="text-4xl font-bold">Special Edition Products</h2>
              <p className="text-gray-300 text-lg">
                Get up to 40% off on our special edition products. Limited stock available.
              </p>
              <div className="flex gap-4">
                <Button size="lg">Shop Now</Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/special-offer.jpg"
                alt="Special Offer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-blue-100 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-orange-100 rounded-full">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Special Offers</h3>
                <p className="text-sm text-gray-600">Save up to 50%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-gray-600">
              Subscribe to our newsletter and get exclusive offers, new product alerts, and more!
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Home',
      description: 'Welcome to our store - find amazing products at great prices!',
    },
  };
}