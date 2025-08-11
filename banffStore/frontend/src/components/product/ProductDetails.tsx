import type { Product } from '../../types'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="px-4 sm:px-0 sm:mt-16 lg:mt-0">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
        <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
      </div>

      {/* Reviews */}
      <div className="mt-3">
        <h2 className="sr-only">Reviews</h2>
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            3.9
            <span className="sr-only"> out of 5 stars</span>
          </p>
          <div className="ml-1 flex items-center">
            {/* Star ratings */}
            {[...Array(4)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400">
                <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            ))}
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-200">
              <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
          </div>
          <div aria-hidden="true" className="ml-4 text-sm text-gray-300">·</div>
          <div className="ml-4 flex">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">See all 512 reviews</a>
          </div>
        </div>
      </div>

      <form className="mt-6">
        {/* Color picker */}
        <div>
          <h2 className="text-sm font-medium text-gray-900">Color</h2>
          <fieldset aria-label="Choose a color" className="mt-2">
            <div className="flex items-center space-x-3">
              <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                <input type="radio" name="color" value="black" defaultChecked aria-label="Black" className="sr-only" />
                <span className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-black"></span>
              </label>
              <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                <input type="radio" name="color" value="heather-grey" aria-label="Heather Grey" className="sr-only" />
                <span className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-400"></span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Size picker */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">Size</h2>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">See sizing chart</a>
          </div>
          <fieldset aria-label="Choose a size" className="mt-2">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <label key={size} className={`${size === 'XL' ? 'cursor-not-allowed opacity-25' : 'cursor-pointer'} group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1`}>
                  <input 
                    type="radio" 
                    name="size" 
                    value={size.toLowerCase()} 
                    defaultChecked={size === 'S'}
                    disabled={size === 'XL'}
                    className="sr-only" 
                  />
                  <span className="text-gray-900">{size}</span>
                  {size !== 'XL' && <span className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[checked]:border-indigo-500" aria-hidden="true"></span>}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add to cart
        </button>
      </form>

      {/* Product details */}
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">Description</h2>
        <div className="mt-4 space-y-6 text-sm text-gray-700">
          <p>{product.description || 'No description available'}</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-sm font-medium text-gray-900">Fabric & Care</h2>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm text-gray-700">
            <li>Only the best materials</li>
            <li>Ethically and locally made</li>
            <li>Pre-washed and pre-shrunk</li>
            <li>Machine wash cold with similar colors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
