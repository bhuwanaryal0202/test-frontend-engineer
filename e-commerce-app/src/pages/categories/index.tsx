import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: {
    name: string;
    count: number;
  }[];
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/categories/electronics.jpg',
    productCount: 156,
    subcategories: [
      { name: 'Smartphones', count: 45 },
      { name: 'Laptops', count: 32 },
      { name: 'Accessories', count: 79 },
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: '/categories/fashion.jpg',
    productCount: 284,
    subcategories: [
      { name: "Men's Wear", count: 98 },
      { name: "Women's Wear", count: 145 },
      { name: 'Accessories', count: 41 },
    ],
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    description: 'Furniture and home decoration',
    image: '/categories/home-living.jpg',
    productCount: 198,
    subcategories: [
      { name: 'Furniture', count: 67 },
      { name: 'Decor', count: 89 },
      { name: 'Kitchen', count: 42 },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Cosmetics and personal care',
    image: '/categories/beauty.jpg',
    productCount: 167,
    subcategories: [
      { name: 'Skincare', count: 56 },
      { name: 'Makeup', count: 78 },
      { name: 'Fragrances', count: 33 },
    ],
  },
  {
    id: 'sports',
    name: 'Sports & Outdoor',
    description: 'Sports equipment and outdoor gear',
    image: '/categories/sports.jpg',
    productCount: 145,
    subcategories: [
      { name: 'Equipment', count: 48 },
      { name: 'Clothing', count: 67 },
      { name: 'Accessories', count: 30 },
    ],
  },
  {
    id: 'books',
    name: 'Books & Media',
    description: 'Books, movies, and music',
    image: '/categories/books.jpg',
    productCount: 234,
    subcategories: [
      { name: 'Books', count: 156 },
      { name: 'Movies', count: 45 },
      { name: 'Music', count: 33 },
    ],
  },
];

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Explore our wide range of products across various categories. Find exactly what you're looking for.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-xl">
                  <div className="relative h-64">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold">{category.name}</h2>
                      <span className="text-sm text-gray-500">{category.productCount} Products</span>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    {/* Subcategories */}
                    <div className="space-y-2">
                      {hoveredCategory === category.id && (
                        <div className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <div
                              key={sub.name}
                              className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600"
                            >
                              <span className="flex items-center">
                                <ChevronRight className="w-4 h-4 mr-1" />
                                {sub.name}
                              </span>
                              <span>({sub.count})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}/featured`}
                className="relative overflow-hidden rounded-lg aspect-[4/3] group"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Categories',
      description: 'Browse all product categories in our store',
    },
  };
} 