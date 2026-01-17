import { GET } from './route';

jest.mock('next/cache', () => ({
  unstable_cache: (fn: any) => fn
}));

describe('GET /api/team', () => {
  it('deve responder sem erro 500 e com formato esperado', async () => {
    const res = await GET();

    expect(res.status).not.toBe(500);

    const data = await res.json();

    if (res.status === 200) {
      expect(data).toHaveProperty('name');
      expect(Array.isArray(data.players)).toBe(true);
      expect(Array.isArray(data.sponsors)).toBe(true);
    } else {
      expect(res.status).toBe(404);
      expect(data).toHaveProperty('error');
    }
  });
});
