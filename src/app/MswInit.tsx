'use client';

import { useEffect } from 'react';

const MswInit = () => {
  useEffect(() => {
    // Only start in development or when explicitly enabled
    const enable = process.env.NEXT_PUBLIC_MSW === 'true' || process.env.NODE_ENV === 'development';

    if (!enable) return;

    // Dynamic import to avoid bundling in prod builds when not used
    import('@/mock/browser')
      .then(({ worker }) => worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js', // default path; can be customized
        },
        onUnhandledRequest: 'bypass', // or 'warn' during debugging
      }))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('MSW failed to start', err);
      });
  }, []);

  return null;
};

export default MswInit;
