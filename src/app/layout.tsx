import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";
import Header from "./Header";
import Container from "./Container";
import { QuizProvider } from './context/QuizContext';

const sora = Sora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suniflow",
  description: "Just a test exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className}`}>
        <Container>
          <Header />
          <QuizProvider>{children}</QuizProvider>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
