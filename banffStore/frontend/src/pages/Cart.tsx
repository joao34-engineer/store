import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Cart() {
  const [data, setData] = useState<{ items: any[]; total: number } | null>(null);

  const load = () => api.cart.get().then(setData);

  useEffect(() => { load(); }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {data.items.map((i) => (
          <li key={i.product.slug}>
            {i.product.name} x {i.quantity} — ${i.line_total.toFixed(2)}
            <button onClick={() => api.cart.remove(i.product.slug).then(load)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${data.total.toFixed(2)}</p>
    </div>
  );
}
