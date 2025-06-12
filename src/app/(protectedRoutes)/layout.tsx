// app/layout.tsx
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'My App',
  description: 'Demo App Layout',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body style={{ height: '100vh' }}>
      <ClientLayout>{children}</ClientLayout>
    </body>
  );
}
