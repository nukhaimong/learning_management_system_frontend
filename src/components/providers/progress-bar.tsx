'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'; // IMPORTANT: The CSS makes it visible

// Optional: Configure look and feel
nProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. This runs when the page has finished loading/changing
    nProgress.done();

    // 2. This listener catches clicks on ALL <a> tags to start the bar instantly
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;

      // Check if it's an internal link and not a "new tab" click
      if (target.href && target.href.startsWith(window.location.origin)) {
        const isDifferentPage = target.href !== window.location.href;
        const isNotModifiedClick =
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          event.button === 0;

        if (isDifferentPage && isNotModifiedClick) {
          nProgress.start();
        }
      }
    };

    const anchors = document.querySelectorAll('a');
    anchors.forEach((a) => a.addEventListener('click', handleAnchorClick));

    return () => {
      anchors.forEach((a) => a.removeEventListener('click', handleAnchorClick));
    };
  }, [pathname, searchParams]); // Re-run whenever the path changes

  return null;
}
