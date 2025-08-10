import type { Product } from '../../types'

interface ProductGalleryProps {
  product: Product
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const productImages = [
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-01.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-02.jpg"
  ]

  return (
    <div className="mt-8 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-start">
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-2">
        <img 
          src={product.image || productImages[0]} 
          alt={`${product.name} main image`} 
          className="lg:col-span-2 lg:row-span-2 rounded-lg" 
        />
        <img 
          src={productImages[1]} 
          alt={`${product.name} side view`} 
          className="hidden lg:block rounded-lg" 
        />
        <img 
          src={productImages[2]} 
          alt={`${product.name} front view`} 
          className="hidden lg:block rounded-lg" 
        />
      </div>
    </div>
  )
}
