import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import { SearchBar } from '@/components/search/SearchBar';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Header() {
  const router = useRouter();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Store
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link href="/categories" className="hover:text-blue-600">
              Categories
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="p-2">
                <ShoppingBag className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
              <nav className="flex flex-col py-4">
                <Link 
                  href="/products" 
                  className="px-4 py-2 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/categories" 
                  className="px-4 py-2 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/about" 
                  className="px-4 py-2 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="px-4 py-2 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="px-4 py-2">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}