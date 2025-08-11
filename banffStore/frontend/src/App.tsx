import { useState } from 'react'
import Layout from './components/layout/Layout'
import ProductPage from './ProductPage'
import { useProducts } from './hooks/useProducts'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('basic-tee')
  const { products, loading, error } = useProducts()

  const handleNavigation = (href: string, productSlug?: string) => {
    if (href === 'product') {
      setCurrentPage('product')
      if (productSlug) {
        setSelectedProductSlug(productSlug)
      }
    } else if (href === '#') {
      setCurrentPage('home')
    }
  }

  // Render different pages based on currentPage state
  if (currentPage === 'product') {
    return <ProductPage onNavigateBack={() => setCurrentPage('home')} productSlug={selectedProductSlug} />
  }

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Bem-vindo à Banff Store
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Descubra nossa coleção exclusiva de roupas e acessórios de alta qualidade. 
                Estilo, conforto e elegância em cada peça.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => handleNavigation('product')}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ver Produtos
                </button>
                <a href="#featured" className="text-sm font-semibold leading-6 text-gray-900">
                  Saiba mais <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div id="featured" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Produtos em Destaque</h2>

          {loading && (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="group relative animate-pulse">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <div className="h-full w-full bg-gray-300"></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-6 text-center">
              <p className="text-red-600">Erro ao carregar produtos: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 text-indigo-600 hover:text-indigo-500"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.name}
                      src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image'
                      }}
                    />
                    {product.is_on_sale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        OFERTA
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-700">
                        <button
                          onClick={() => handleNavigation('product', product.slug)}
                          className="text-left hover:text-gray-900 font-medium"
                        >
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </button>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                      {product.average_rating > 0 && (
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <svg
                                key={rating}
                                className={`${
                                  product.average_rating > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                } h-3 w-3 flex-shrink-0`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                          <p className="ml-1 text-xs text-gray-500">({product.review_count})</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.price_display || `R$ ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}`}
                      </p>
                      {product.compare_at_price && (
                        <p className="text-xs text-gray-500 line-through">
                          {product.compare_at_price_display || `R$ ${product.compare_at_price}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-500">Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
