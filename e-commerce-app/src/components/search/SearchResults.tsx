import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface SearchResultsProps {
  results: Product[];
  onClose: () => void;
}

export function SearchResults({ results, onClose }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      {results.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">{product.title}</h4>
            <p className="text-sm text-gray-500 truncate">{product.category}</p>
            <p className="text-sm font-medium text-blue-600">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}