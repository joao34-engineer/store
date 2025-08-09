const API_BASE = import.meta.env.VITE_API_BASE as string;

type HttpOptions = RequestInit & { auth?: string | null };

async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (options.auth) headers['Authorization'] = `Bearer ${options.auth}`;
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: { ...headers, ...(options.headers as any) },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  products: {
    list: (params?: Record<string, string>) => {
      const qs = params ? `?${new URLSearchParams(params)}` : '';
      return http<{ results: any[]; count: number }>(`/products/${qs}`);
    },
    detail: (slug: string) => http<any>(`/products/${slug}/`),
  },
  categories: {
    list: () => http<any[]>(`/categories/`),
    detail: (slug: string) => http<any>(`/categories/${slug}/`),
  },
  cart: {
    get: () => http<{ items: any[]; total: number }>(`/cart/`),
    add: (product: number | string, quantity = 1) =>
      http<{ detail: string }>(`/cart/add`, { method: 'POST', body: JSON.stringify({ product, quantity }) }),
    set: (product: number | string, quantity = 1) =>
      http<{ detail: string }>(`/cart/set`, { method: 'POST', body: JSON.stringify({ product, quantity }) }),
    remove: (product: number | string) =>
      http<{ detail: string }>(`/cart/remove`, { method: 'POST', body: JSON.stringify({ product }) }),
    checkout: (payload: { email: string; full_name: string; address: string; city: string; postal_code: string; country?: string }) =>
      http<any>(`/cart/checkout`, { method: 'POST', body: JSON.stringify(payload) }),
  },
};
