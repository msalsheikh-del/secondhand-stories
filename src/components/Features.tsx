import { motion } from 'framer-motion';
import { BookOpen, Truck, ThumbsUp, Star } from 'lucide-react';

const features = [
  { icon: BookOpen, title: 'Hand-Curated', desc: 'Every book is inspected and graded for quality.' },
  { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $25 — delivered to your door.' },
  { icon: ThumbsUp, title: 'Great Prices', desc: 'Save up to 70% compared to buying new.' },
  { icon: Star, title: 'Satisfaction Guaranteed', desc: '30-day returns on every purchase.' },
];

export const Features = () => (
  <section className="bg-secondary/40 py-16">
    <div className="container mx-auto px-6">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center text-center rounded-lg bg-card border border-border p-6 shadow-book"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-foreground">{f.title}</h3>
            <p className="mt-1 font-body text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
