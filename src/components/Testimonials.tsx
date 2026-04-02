import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', text: 'Amazing selection and the books arrived in great condition. My new go-to bookstore!', rating: 5 },
  { name: 'James K.', text: 'Saved a fortune buying pre-loved copies. The grading system is super accurate.', rating: 5 },
  { name: 'Priya D.', text: 'Love the curated feel — like browsing a real second-hand bookshop from my couch.', rating: 4 },
];

export const Testimonials = () => (
  <section className="py-16">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-2xl font-bold text-foreground md:text-3xl"
      >
        What Our Readers Say
      </motion.h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-lg border border-border bg-card p-6 shadow-book"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-4 w-4 ${s <= t.rating ? 'fill-accent text-accent' : 'text-border'}`} />
              ))}
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground/80">"{t.text}"</p>
            <p className="mt-4 font-display text-sm font-semibold text-foreground">— {t.name}</p>
          </motion.blockquote>
        ))}
      </div>
    </div>
  </section>
);
