import type { Metadata } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'FEBROS16 — Knowledge, Research & Discovery',
  description: 'Discover knowledge, research, educational resources, opportunities and useful information with Febros16.',
  openGraph: {
    title: 'FEBROS16 — Knowledge, Research & Discovery',
    description: 'Discover knowledge, research, educational resources, opportunities and useful information with Febros16.',
    url: 'https://febros16.com',
    siteName: 'FEBROS16',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FEBROS16 — Knowledge, Research & Discovery',
    description: 'Discover knowledge, research, educational resources, opportunities and useful information with Febros16.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
