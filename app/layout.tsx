import { Navbar } from '@/components/landingPage/layout/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/landingPage/layout/Footer';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlantGuard AI - Plant Disease Detection',
  description: 'AI-powered plant disease detection and treatment recommendations at your fingertips',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <div className="relative min-h-screen flex flex-col">

              <main className="flex-1">
                {children}
              </main>

            </div>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
