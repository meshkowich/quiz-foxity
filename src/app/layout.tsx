import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";
import Header from "./Header";
import Container from "./Container";
import { QuizProvider } from './context/QuizContext';
import MswInit from "./MswInit";

const sora = Sora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "suniflow",
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
          <MswInit />
          <Header />
          <QuizProvider>{children}</QuizProvider>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
