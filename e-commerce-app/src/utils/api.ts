import { Product } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      throw new APIError(errorData.message || errorMessage, response.status);
    } catch {
      throw new APIError(errorMessage, response.status);
    }
  }
  try {
    return await response.json();
  } catch (error) {
    throw new APIError('Failed to parse response data', response.status);
  }
}

export const api = {
  async getProducts(limit: number = 12, offset: number = 0): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const products = await handleResponse<Product[]>(response);
      return products.slice(offset, offset + limit);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(error instanceof Error ? error.message : 'Network error');
    }
  },

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      return await handleResponse<Product>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(error instanceof Error ? error.message : 'Network error');
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      return await handleResponse<Product[]>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(error instanceof Error ? error.message : 'Network error');
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      return await handleResponse<string[]>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(error instanceof Error ? error.message : 'Network error');
    }
  }
};