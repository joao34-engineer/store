import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/">Catalog</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
