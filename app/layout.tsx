import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let userPromise = getUser();

  return (
    <html
      lang="en"
    >
      <body>
        <ThemeProvider defaultTheme='system' attribute="class">
        {/* <UserProvider userPromise={userPromise}></UserProvider> */}
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
