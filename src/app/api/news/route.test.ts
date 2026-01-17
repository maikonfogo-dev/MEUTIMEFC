import prisma from '@/lib/prisma';
import { GET, POST } from './route';
import {
  GET as GET_BY_ID,
  PUT as PUT_BY_ID,
  DELETE as DELETE_BY_ID
} from './[id]/route';

async function ensureTeam() {
  const existing = await prisma.team.findFirst();
  if (existing) return existing;

  return prisma.team.create({
    data: {
      id: 'test-team',
      name: 'Time de Teste',
      planId: 'test'
    }
  });
}

describe('GET /api/news', () => {
  it('deve responder sem erro 500 e retornar um array', async () => {
    const res = await GET();

    expect(res.status).not.toBe(500);

    const data: any = await res.json();

    if (res.status === 200) {
      expect(Array.isArray(data)).toBe(true);
    } else if (res.status === 404) {
      expect(Array.isArray(data)).toBe(true);
    }
  });
});

describe('CRUD /api/news', () => {
  it('cria, atualiza e remove uma notícia', async () => {
    await ensureTeam();

    const createBody = {
      title: 'Notícia de Teste',
      summary: 'Resumo da notícia de teste',
      content: 'Conteúdo completo',
      date: '2026-01-15',
      imageUrl: null as string | null
    };

    const createReq = new Request('http://localhost/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createBody)
    });

    const createRes = await POST(createReq);
    expect(createRes.status).toBe(201);

    const created: any = await createRes.json();
    expect(created).toHaveProperty('id');
    expect(created.title).toBe(createBody.title);

    const id = created.id as string;

    const getRes = await GET_BY_ID(
      new Request(`http://localhost/api/news/${id}`),
      { params: { id } }
    );
    expect(getRes.status).toBe(200);
    const fetched: any = await getRes.json();
    expect(fetched.id).toBe(id);

    const updateBody = {
      ...createBody,
      title: 'Notícia Atualizada'
    };

    const updateReq = new Request(`http://localhost/api/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateBody)
    });

    const updateRes = await PUT_BY_ID(updateReq, { params: { id } });
    expect(updateRes.status).toBe(200);
    const updated: any = await updateRes.json();
    expect(updated.title).toBe('Notícia Atualizada');

    const deleteRes = await DELETE_BY_ID(
      new Request(`http://localhost/api/news/${id}`, { method: 'DELETE' }),
      { params: { id } }
    );
    expect(deleteRes.status).toBe(200);

    const afterDeleteRes = await GET_BY_ID(
      new Request(`http://localhost/api/news/${id}`),
      { params: { id } }
    );
    expect(afterDeleteRes.status).toBe(404);
  });
});
