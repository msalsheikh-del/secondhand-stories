import { useState } from 'react';
import { books, genres } from '@/lib/books-data';
import { BookCard } from './BookCard';
import { Search } from 'lucide-react';

export const BookGrid = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = books.filter(b => {
    const matchGenre = activeGenre === 'All' || b.genre === activeGenre;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <section id="browse" className="container mx-auto px-6 py-16">
      <h2 className="font-display text-3xl font-bold text-foreground">Browse Books</h2>
      <p className="mt-2 font-body text-muted-foreground">
        {books.length} pre-loved books waiting for a new home
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors ${
                activeGenre === genre
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search title or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-72"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-display text-xl text-muted-foreground">No books found</p>
          <p className="mt-2 font-body text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </section>
  );
};
