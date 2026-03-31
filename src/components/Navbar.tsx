import { ShoppingCart, BookOpen } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { CartDrawer } from './CartDrawer';

export const Navbar = () => {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-semibold text-foreground">
              Second Chapter
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#browse" className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Browse
            </a>
            <a href="#about" className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-lg bg-primary p-2.5 text-primary-foreground transition-transform hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};
