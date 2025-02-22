import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    price: Float!
    description: String!
    category: String!
    image: String!
    rating: Rating!
  }

  type Rating {
    rate: Float!
    count: Int!
  }

  type Category {
    id: String!
    name: String!
    description: String!
    image: String!
    productCount: Int!
    subcategories: [Subcategory!]!
  }

  type Subcategory {
    name: String!
    count: Int!
  }

  type Query {
    products(limit: Int, offset: Int): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: String!): Category
    productsByCategory(category: String!): [Product!]!
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      id
      title
      price
      description
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      image
      productCount
      subcategories {
        name
        count
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: String!) {
    category(id: $id) {
      id
      name
      description
      image
      productCount
      subcategories {
        name
        count
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      id
      title
      price
      description
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;