import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '@/utils/api';
import { Product } from '@/types/product';
import { SearchResults } from './SearchResults';

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const products = await api.getProducts();
        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative w-full sm:max-w-md md:max-w-lg">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full py-2 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
      {isSearching ? (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
          Searching...
        </div>
      ) : (
        <SearchResults
          results={results}
          onClose={() => setResults([])}
        />
      )}
    </div>
  );
}