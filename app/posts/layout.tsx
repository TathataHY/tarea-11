import Aside from "@/components/aside";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <Aside />
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
