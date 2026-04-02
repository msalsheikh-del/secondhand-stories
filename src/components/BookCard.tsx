import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book } from '@/lib/books-data';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

const conditionColor: Record<string, string> = {
  'Like New': 'bg-primary text-primary-foreground',
  'Very Good': 'bg-primary/80 text-primary-foreground',
  'Good': 'bg-accent text-accent-foreground',
  'Acceptable': 'bg-muted text-muted-foreground',
};

export const BookCard = ({ book, index }: { book: Book; index: number }) => {
  const { addToCart } = useCart();
  const discount = Math.round((1 - book.price / book.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-book transition-shadow hover:shadow-book-hover"
    >
      <Link to={`/book/${book.id}`} className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-xs font-semibold ${conditionColor[book.condition]}`}>
          {book.condition}
        </span>
        <span className="absolute right-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
          -{discount}%
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {book.genre}
        </span>
        <h3 className="mt-1 font-display text-base font-semibold leading-snug text-foreground line-clamp-2">
          {book.title}
        </h3>
        <p className="mt-0.5 font-body text-sm text-muted-foreground">
          {book.author}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="font-display text-xl font-bold text-foreground">
              ${book.price.toFixed(2)}
            </span>
            <span className="ml-2 font-body text-sm text-muted-foreground line-through">
              ${book.originalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => addToCart(book)}
            className="rounded-lg bg-primary p-2 text-primary-foreground transition-transform hover:scale-110"
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
