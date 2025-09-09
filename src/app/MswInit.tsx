'use client';

import { useEffect } from 'react';

const MswInit = () => {
  useEffect(() => {
    // Only start in development or when explicitly enabled
    const enable = process.env.NEXT_PUBLIC_MSW === 'true' || process.env.NODE_ENV === 'development';

    if (!enable) return;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

    import('@/mock/browser')
      .then(({ worker }) => worker.start({
        serviceWorker: {
          url: `${basePath}/mockServiceWorker.js`,
        },
        onUnhandledRequest: 'bypass', // or 'warn' during debugging
      }))
      .catch((err) => {
        console.warn('MSW failed to start', err);
      });
  }, []);

  return null;
};

export default MswInit;
