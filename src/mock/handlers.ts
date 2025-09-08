import { http, HttpResponse } from 'msw';

// Example mocks (adjust URLs to match real calls)
export const handlers = [
  // GET example
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({ id: '1', name: 'Jane Doe' });
  }),

  // POST example (echo back body)
  http.post('/api/submit', async ({ request }) => {
    const body = await request.json();
    const success = Math.random() > 0.5; // 50% chance of success
    if (success) {
      return HttpResponse.json({ ok: true, received: body }, { status: 200 });
    }
    return HttpResponse.json({ ok: false, received: body, errorMessage: 'Just a simulation of error. Try again!' }, { status: 500 });
  }),
];
