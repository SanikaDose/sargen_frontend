// app/layout.tsx

import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'My App',
  description: 'Demo App Layout',
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
