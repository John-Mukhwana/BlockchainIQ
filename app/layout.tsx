import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockchainIQ - Master Blockchain & Crypto Knowledge',
  description: 'Ultimate blockchain and cryptocurrency quiz platform. Test your knowledge with 15 randomized questions from 80+ topics and earn your exclusive NFT-style certificate!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
          {children}
        </div>
      </body>
    </html>
  );
}