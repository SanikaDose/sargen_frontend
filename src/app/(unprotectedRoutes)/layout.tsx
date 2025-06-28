// app/layout.tsx
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Sargen',
  description: 'Demo App Layout',
  icons: {
    icon: '/sargen.png',
    shortcut: '/sargen.png',
    apple: '/sargen.png',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
