import { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.products.list().then((data) => {
      setProducts(data.results ?? data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl mb-6">Catalog</h1>
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {products.map((p) => (
          <article key={p.slug} className="border rounded p-3">
            <Link to={`/product/${p.slug}`}>
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover mb-2" />}
              <h4 className="font-semibold">{p.name}</h4>
            </Link>
            <p>${p.price}</p>
            <button className="mt-2 px-3 py-1 rounded text-white" style={{ backgroundColor: '#1e293b' }} onClick={() => api.cart.add(p.slug, 1)}>Add to cart</button>
          </article>
        ))}
      </div>
    </div>
  );
}
