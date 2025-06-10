 export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html>
      <body>
        <div className="flex min-h-screen">
          <main className="flex-1 overflow-y-auto bg-white p-2 lg:p-4 text-black">
            <h1 className="text-4xl font-semibold mb-4 text-center md:text-left">Anasayfa</h1>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
