import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BookGrid />
      <Footer />
    </div>
  );
};

export default Index;
