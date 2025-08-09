import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!slug) return;
    api.products.detail(slug).then(setProduct);
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <div>
        <input type="number" min={1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || '1', 10))} />
        <button onClick={() => api.cart.add(product.slug, qty)}>Add to cart</button>
      </div>
    </div>
  );
}
