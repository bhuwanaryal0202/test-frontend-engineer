// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '@/context/CartContext'
import { Layout } from '@/components/layout/Layout'
import { ApolloProvider } from '@/components/providers/ApolloProvider'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
     
        <CartProvider>
          <Layout
            seo={{
              title: pageProps.title,
              description: pageProps.description,
            }}
          >
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      
    </ApolloProvider>
  )
}