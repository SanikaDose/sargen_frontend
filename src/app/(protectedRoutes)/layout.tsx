import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import '../page.module.css';
export const metadata: Metadata = {
  title: 'Sargen',
  description: 'Demo App Layout',
  icons: {
    icon: '/sargen.png', // You must use a path string — not an imported image
    shortcut: '/sargen.png',
    apple: '/sargen.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
