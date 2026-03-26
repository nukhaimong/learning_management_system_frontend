import Navbar from '@/components/layout/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full mx-auto px-6">
      <Navbar />
      {children}
    </div>
  );
}
