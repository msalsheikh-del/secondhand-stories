import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '', cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const shipping = totalPrice > 25 ? 0 : 3.99;
  const tax = +(totalPrice * 0.08).toFixed(2);
  const total = +(totalPrice + shipping + tax).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-2 font-body text-muted-foreground">Add some books before checking out.</p>
          <Button asChild className="mt-6"><Link to="/">Browse Books</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-32 text-center px-4">
          <CheckCircle className="h-16 w-16 text-primary" />
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Order Placed!</h1>
          <p className="mt-2 font-body text-muted-foreground max-w-md">Thank you for your order. This is a demo — no actual payment was processed.</p>
          <Button asChild className="mt-6"><Link to="/">Continue Shopping</Link></Button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left — form fields */}
          <div className="space-y-8">
            {/* Shipping */}
            <section className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-foreground">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-body text-sm font-medium text-foreground">First Name</label>
                  <Input value={form.firstName} onChange={set('firstName')} required className="mt-1" maxLength={50} />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground">Last Name</label>
                  <Input value={form.lastName} onChange={set('lastName')} required className="mt-1" maxLength={50} />
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground">Email</label>
                <Input type="email" value={form.email} onChange={set('email')} required className="mt-1" maxLength={255} />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground">Address</label>
                <Input value={form.address} onChange={set('address')} required className="mt-1" maxLength={200} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="font-body text-sm font-medium text-foreground">City</label>
                  <Input value={form.city} onChange={set('city')} required className="mt-1" maxLength={100} />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground">State</label>
                  <Input value={form.state} onChange={set('state')} required className="mt-1" maxLength={50} />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground">ZIP Code</label>
                  <Input value={form.zip} onChange={set('zip')} required className="mt-1" maxLength={10} />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-foreground">Payment Details</h2>
              <p className="font-body text-xs text-muted-foreground">Demo only — no real payment is processed.</p>
              <div>
                <label className="font-body text-sm font-medium text-foreground">Name on Card</label>
                <Input value={form.cardName} onChange={set('cardName')} required className="mt-1" maxLength={100} />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground">Card Number</label>
                <Input value={form.cardNumber} onChange={set('cardNumber')} placeholder="4242 4242 4242 4242" required className="mt-1" maxLength={19} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-body text-sm font-medium text-foreground">Expiry</label>
                  <Input value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" required className="mt-1" maxLength={5} />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground">CVV</label>
                  <Input value={form.cvv} onChange={set('cvv')} placeholder="123" required className="mt-1" maxLength={4} />
                </div>
              </div>
            </section>
          </div>

          {/* Right — order summary */}
          <div className="lg:sticky lg:top-8 h-fit rounded-lg border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Order Summary</h2>

            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex gap-3">
                  <img src={book.cover} alt={book.title} className="h-16 w-11 rounded object-cover border border-border" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-semibold text-foreground line-clamp-1">{book.title}</p>
                    <p className="font-body text-xs text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <span className="font-display text-sm font-bold text-foreground whitespace-nowrap">${(book.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 font-body text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-display text-lg font-bold text-foreground">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>

            <Button type="submit" className="w-full" size="lg">Place Order</Button>
            <p className="text-center font-body text-xs text-muted-foreground">Free shipping on orders over $25</p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
