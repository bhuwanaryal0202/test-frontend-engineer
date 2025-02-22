import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { SearchBar } from '@/components/search/SearchBar';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { items } = useCart();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
            <Button variant="outline" size="sm" className="p-2 md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}