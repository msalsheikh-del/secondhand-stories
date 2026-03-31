import { BookOpen } from 'lucide-react';

export const Footer = () => (
  <footer id="about" className="border-t border-border bg-card">
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-semibold text-foreground">Second Chapter</span>
          </div>
          <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed">
            Giving pre-loved books a second life. Every book is carefully inspected and graded so you know exactly what you're getting.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">Condition Guide</h4>
          <ul className="mt-3 space-y-2 font-body text-sm text-muted-foreground">
            <li><strong className="text-foreground">Like New</strong> — Unread, pristine condition</li>
            <li><strong className="text-foreground">Very Good</strong> — Minimal signs of use</li>
            <li><strong className="text-foreground">Good</strong> — Some wear, fully readable</li>
            <li><strong className="text-foreground">Acceptable</strong> — Well-loved, all pages intact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="mt-3 space-y-2 font-body text-sm text-muted-foreground">
            <li><a href="#browse" className="hover:text-foreground transition-colors">Browse Books</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Sell Your Books</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center font-body text-xs text-muted-foreground">
        © 2026 Second Chapter. All rights reserved.
      </div>
    </div>
  </footer>
);
