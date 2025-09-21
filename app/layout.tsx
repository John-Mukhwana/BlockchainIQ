import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL
  
  return {
    title: 'BlockchainIQ - Master Blockchain & Crypto Knowledge',
    description: 'Ultimate blockchain and cryptocurrency quiz platform. Test your knowledge with 15 randomized questions from 80+ topics and earn your exclusive NFT-style certificate!',
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `${URL}/embed-image.png`,
        button: {
          title: 'Start Quiz Challenge',
          action: {
            type: 'launch_miniapp',
            name: 'BlockchainIQ',
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: '#22c55e',
          },
        },
      }),
    },
  };
}

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