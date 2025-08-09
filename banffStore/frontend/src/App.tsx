import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NavBar from './components/NavBar'
import { api } from './api'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    api.cart.get().then(d => setCount(d.items.reduce((n, i) => n + i.quantity, 0))).catch(() => {})
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/">Catalog</Link>
        <Link to="/cart">Cart ({count})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
