import { ApolloError } from '@apollo/client';

const BASE_URL = 'https://fakestoreapi.com';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: Array<{ name: string; count: number }>;
}

async function fetchJson<T>(url: string): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApolloError({ errorMessage: 'Request timeout' });
    }
    throw new ApolloError(
{ errorMessage: error instanceof Error ? error.message : 'Network error' }
    );
  }
}

export const resolvers = {
  Query: {
    products: async (_: any, { limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
      const products = await fetchJson<Product[]>(`${BASE_URL}/products`);
      return products.slice(offset, offset + limit);
    },

    product: async (_: any, { id }: { id: string }) => {
      return await fetchJson<Product>(`${BASE_URL}/products/${id}`);
    },

    categories: async () => {
      const categories = await fetchJson<string[]>(`${BASE_URL}/products/categories`);
      return categories.map((name) => ({
        id: name,
        name,
        description: `${name} category`,
        image: 'https://via.placeholder.com/150',
        productCount: 0,
        subcategories: [],
      }));
    },

    category: async (_: any, { id }: { id: string }) => {
      const products = await fetchJson<Product[]>(`${BASE_URL}/products/category/${id}`);
      return {
        id,
        name: id,
        description: `${id} category`,
        image: 'https://via.placeholder.com/150',
        productCount: products.length,
        subcategories: [],
      };
    },

    productsByCategory: async (_: any, { category }: { category: string }) => {
      return await fetchJson<Product[]>(`${BASE_URL}/products/category/${category}`);
    },
  },
};