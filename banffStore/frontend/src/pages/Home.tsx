export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <section className="text-center py-16 rounded" style={{ backgroundColor: '#a9cf76' }}>
        <h1 className="text-4xl mb-4" style={{ color: '#333' }}>Welcome to Banff Store</h1>
        <p className="text-lg mb-8" style={{ color: '#666' }}>Your one-stop shop for quality products</p>
        <a href="/" className="btn">Shop Now</a>
      </section>
      <section className="py-8">
        <h2 className="text-2xl text-center mb-8" style={{ color: '#333' }}>Featured Products</h2>
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Populate with API data later */}
        </div>
      </section>
    </div>
  );
}
