import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Checkout() {
  const [cart, setCart] = useState<{ items: any[]; total: number } | null>(null);
  const [done, setDone] = useState<any>(null);

  useEffect(() => {
    api.cart.get().then(setCart);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get('full_name') || ''),
      email: String(fd.get('email') || ''),
      address: String(fd.get('address') || ''),
      city: String(fd.get('city') || ''),
      postal_code: String(fd.get('postal_code') || ''),
      country: String(fd.get('country') || ''),
    };
    const order = await api.cart.checkout(payload);
    setDone(order);
  };

  if (done) return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Thank you!</h1>
      <p>Your order #{done.id} has been placed.</p>
    </div>
  );

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="space-y-3">
        <h2 className="text-xl font-semibold mb-2">Checkout</h2>
        <input name="full_name" placeholder="Full name" className="border rounded p-2 w-full" required />
        <input name="email" type="email" placeholder="Email" className="border rounded p-2 w-full" required />
        <input name="address" placeholder="Address" className="border rounded p-2 w-full" required />
        <div className="grid grid-cols-2 gap-3">
          <input name="city" placeholder="City" className="border rounded p-2 w-full" required />
          <input name="postal_code" placeholder="Postal code" className="border rounded p-2 w-full" required />
        </div>
        <input name="country" placeholder="Country" className="border rounded p-2 w-full" />
        <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: '#1e293b' }} type="submit">Place order</button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">Order summary</h2>
        <ul className="space-y-2">
          {cart.items.map((i) => (
            <li key={i.product.slug} className="flex justify-between">
              <span>{i.product.name} x {i.quantity}</span>
              <span>${i.line_total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
