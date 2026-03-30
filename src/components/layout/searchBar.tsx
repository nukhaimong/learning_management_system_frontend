// components/searchBar.tsx
'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar = ({ isMobile = false }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      startTransition(() => {
        router.push(
          `/explore/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`,
        );
      });
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle ⌘K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="search"]',
        ) as HTMLInputElement;
        searchInput?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Different styling for mobile vs desktop
  if (isMobile) {
    return (
      <div className="w-full my-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, tutorials, or topics..."
            className="w-full pl-10 pr-12 py-2 bg-muted/50 border-border rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPending}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-3 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={handleSearch}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <>
                Search
                <ArrowRight className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Desktop version with full styling
  return (
    <div className="flex-1 max-w-xl hidden md:block">
      <div
        className={`w-full relative transition-all duration-200 ${
          searchFocused ? 'scale-[1.01]' : 'scale-100'
        }`}
      >
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
              searchFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
          <Input
            type="search"
            placeholder="Search courses, tutorials, or topics..."
            className="w-full pl-10 pr-24 py-2 bg-muted/50 border-border rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPending}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono font-medium bg-background border rounded-md shadow-sm">
              ⌘K
            </kbd>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={handleSearch}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  Search
                  <ArrowRight className="ml-1 h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
