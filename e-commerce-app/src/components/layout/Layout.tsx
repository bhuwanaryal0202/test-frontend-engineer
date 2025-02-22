import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEO, SEOProps } from './SEO';

interface LayoutProps {
  children: ReactNode;
  seo?: SEOProps;
}

export function Layout({ children, seo }: LayoutProps) {
  return (
    <>
      <SEO {...seo} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}