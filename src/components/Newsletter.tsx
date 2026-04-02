import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: 'Subscribed!', description: 'Thanks for joining our newsletter.' });
    setEmail('');
  };

  return (
    <section className="bg-primary py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 text-center"
      >
        <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
          Stay in the Loop
        </h2>
        <p className="mt-2 font-body text-sm text-primary-foreground/70">
          Get notified about new arrivals, deals, and reading recommendations.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            maxLength={255}
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button type="submit" variant="secondary" className="shrink-0">Subscribe</Button>
        </form>
      </motion.div>
    </section>
  );
};
