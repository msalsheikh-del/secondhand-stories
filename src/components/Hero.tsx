import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-books.jpg';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Stack of vintage books with coffee"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative container mx-auto px-6 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
            Every book deserves
            <span className="block italic text-accent">a second chapter.</span>
          </h1>
          <p className="mt-6 font-body text-lg text-primary-foreground/80 md:text-xl">
            Discover pre-loved books at unbeatable prices. Curated, graded, and ready for their next reader.
          </p>
          <a
            href="#browse"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3.5 font-body text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Start Browsing
          </a>
        </motion.div>
      </div>
    </section>
  );
};
