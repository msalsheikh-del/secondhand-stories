import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { books } from '@/lib/books-data';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const conditionColor: Record<string, string> = {
  'Like New': 'bg-primary text-primary-foreground',
  'Very Good': 'bg-primary/80 text-primary-foreground',
  'Good': 'bg-accent text-accent-foreground',
  'Acceptable': 'bg-muted text-muted-foreground',
};

const BookDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const book = books.find((b) => b.id === id);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="font-display text-2xl font-bold text-foreground">Book not found</h1>
          <Link to="/" className="mt-4 text-primary underline">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = Math.round((1 - book.price / book.originalPrice) * 100);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setReviews((prev) => [newReview, ...prev]);
    setName('');
    setRating(5);
    setComment('');
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const relatedBooks = books.filter((b) => b.genre === book.genre && b.id !== book.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        {/* Book details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-8 md:grid-cols-[300px_1fr]"
        >
          <div className="relative overflow-hidden rounded-lg border border-border shadow-book">
            <img src={book.cover} alt={book.title} className="w-full object-cover aspect-[2/3]" />
            <span className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-xs font-semibold ${conditionColor[book.condition]}`}>
              {book.condition}
            </span>
            <span className="absolute right-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
              -{discount}%
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">{book.genre} · {book.year}</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground">{book.title}</h1>
            <p className="mt-1 font-body text-lg text-muted-foreground">by {book.author}</p>

            {avgRating && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.round(Number(avgRating)) ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">{avgRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </div>
            )}

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-foreground">${book.price.toFixed(2)}</span>
              <span className="font-body text-lg text-muted-foreground line-through">${book.originalPrice.toFixed(2)}</span>
              <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-sm font-semibold text-destructive">Save {discount}%</span>
            </div>

            <p className="mt-6 font-body text-base leading-relaxed text-foreground/80">{book.description}</p>

            <Button onClick={() => addToCart(book)} className="mt-8 w-fit gap-2" size="lg">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </motion.div>

        {/* Reviews section */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground">Reviews</h2>

          {/* Review form */}
          <form onSubmit={handleSubmitReview} className="mt-6 rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Write a Review</h3>

            <div>
              <label className="font-body text-sm font-medium text-foreground">Your Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="mt-1" maxLength={100} required />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground">Rating</label>
              <div className="mt-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star className={`h-6 w-6 ${s <= (hoverRating || rating) ? 'fill-accent text-accent' : 'text-border'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground">Your Review</label>
              <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts about this book..." className="mt-1" rows={4} maxLength={1000} required />
            </div>

            <Button type="submit">Submit Review</Button>
          </form>

          {/* Reviews list */}
          <div className="mt-8 space-y-4">
            {reviews.length === 0 && (
              <p className="font-body text-muted-foreground">No reviews yet. Be the first to review this book!</p>
            )}
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-foreground">{review.name}</span>
                  <span className="font-body text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-1 flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <p className="mt-2 font-body text-sm text-foreground/80">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related books */}
        {relatedBooks.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground">More in {book.genre}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedBooks.map((rb) => (
                <Link key={rb.id} to={`/book/${rb.id}`} className="group overflow-hidden rounded-lg border border-border bg-card shadow-book transition-shadow hover:shadow-book-hover">
                  <div className="aspect-[2/3] overflow-hidden">
                    <img src={rb.cover} alt={rb.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-sm font-semibold text-foreground line-clamp-1">{rb.title}</h3>
                    <p className="font-body text-xs text-muted-foreground">{rb.author}</p>
                    <span className="font-display text-sm font-bold text-foreground">${rb.price.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookDetail;
