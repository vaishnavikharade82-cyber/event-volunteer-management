import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { AuthProvider } from "../context/AuthContext"; // ✅ ADD THIS

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>   {/* ✅ WRAP EVERYTHING */}
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}