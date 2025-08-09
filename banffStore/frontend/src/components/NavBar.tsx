export default function NavBar() {
  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#a9cf76', borderBottom: '1px solid #e2e8f0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="banff-title playfair-display-black" style={{ color: '#1e293b' }}>Banff Store</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="transition duration-300 playfair-display font-medium text-lg" style={{ color: '#1e293b' }}>Home</a>
            <a href="#products" className="transition duration-300 playfair-display font-medium text-lg" style={{ color: '#1e293b' }}>Products</a>
            <a href="#about" className="transition duration-300 playfair-display font-medium text-lg" style={{ color: '#1e293b' }}>About</a>
            <a href="#contact" className="transition duration-300 playfair-display font-medium text-lg" style={{ color: '#1e293b' }}>Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <i className="fas fa-shopping-cart text-xl transition duration-300" style={{ color: '#475569' }}></i>
              <span className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center playfair-display font-bold" style={{ backgroundColor: '#f59e0b' }}>3</span>
            </button>
            <button className="text-white px-4 py-2 rounded-lg transition duration-300 playfair-display font-semibold" style={{ backgroundColor: '#1e293b' }}>
              <i className="fas fa-user mr-2"></i>Login
            </button>
          </div>
          <div className="md:hidden">
            <button className="transition duration-300" style={{ color: '#475569' }}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
