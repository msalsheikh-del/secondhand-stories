import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Your Cart</h2>
              <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
                <p className="font-display text-lg text-muted-foreground">Cart is empty</p>
                <p className="font-body text-sm text-muted-foreground">Add some books to get started</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.book.id} className="flex gap-4 rounded-lg border border-border bg-card p-3">
                        <img src={item.book.cover} alt={item.book.title} className="h-20 w-14 rounded object-cover" loading="lazy" />
                        <div className="flex flex-1 flex-col">
                          <h4 className="font-display text-sm font-semibold leading-tight text-foreground">{item.book.title}</h4>
                          <p className="font-body text-xs text-muted-foreground">{item.book.author}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)} className="rounded bg-secondary p-1 text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-body text-sm font-medium text-foreground">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)} className="rounded bg-secondary p-1 text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-display text-sm font-bold text-foreground">${(item.book.price * item.quantity).toFixed(2)}</span>
                              <button onClick={() => removeFromCart(item.book.id)} className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border px-6 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-display text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full rounded-lg bg-primary py-3 font-body text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
                    Checkout
                  </button>
                  <button onClick={clearCart} className="w-full rounded-lg border border-border py-2 font-body text-xs text-muted-foreground hover:bg-secondary">
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
