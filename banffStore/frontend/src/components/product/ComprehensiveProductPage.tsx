interface ComprehensiveProductPageProps {
  productData?: {
    name: string
    price: number
    description: string
    rating: number
    reviewCount: number
    images: string[]
    colors: Array<{ name: string; value: string; available: boolean }>
    sizes: Array<{ name: string; value: string; available: boolean }>
  }
}

export default function ComprehensiveProductPage({ productData }: ComprehensiveProductPageProps) {
  // Default product data if none provided
  const product = productData || {
    name: "Basic Tee",
    price: 35,
    description: "The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee its own look.",
    rating: 3.9,
    reviewCount: 512,
    images: [
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-01.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-02.jpg"
    ],
    colors: [
      { name: "Black", value: "black", available: true },
      { name: "Heather Grey", value: "heather-grey", available: true }
    ],
    sizes: [
      { name: "XXS", value: "xxs", available: true },
      { name: "XS", value: "xs", available: true },
      { name: "S", value: "s", available: true },
      { name: "M", value: "m", available: true },
      { name: "L", value: "l", available: true },
      { name: "XL", value: "xl", available: false }
    ]
  }

  const reviews = [
    {
      id: 1,
      author: "Risako M",
      date: "May 16, 2021",
      rating: 5,
      title: "Can't say enough good things",
      content: [
        "I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!",
        "The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!"
      ]
    },
    {
      id: 2,
      author: "Jackie H",
      date: "April 6, 2021",
      rating: 5,
      title: "Very comfy and looks the part",
      content: [
        "After a quick chat with customer support, I had a good feeling about this shirt and ordered three of them.",
        "Less than 48 hours later, my delivery arrived. I haven't worn anything else since that day! These shirts are so comfortable, yet look classy enough that I can wear them at work or even some formal events. Winning!"
      ]
    },
    {
      id: 3,
      author: "Laura G",
      date: "February 24, 2021",
      rating: 4,
      title: "The last shirts I may ever need",
      content: [
        "I bought two of those comfy cotton shirts, and let me tell you: they're amazing! I have been wearing them almost every day. Even after a dozen of washes, that still looks and feel good as new. Will definitely order a few more... If I ever need to!"
      ]
    }
  ]

  const relatedProducts = [
    {
      name: "Basic Tee",
      color: "Aspen White",
      price: "$35",
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg"
    },
    {
      name: "Basic Tee",
      color: "Charcoal",
      price: "$35",
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg"
    },
    {
      name: "Artwork Tee",
      color: "Iso Dots",
      price: "$35",
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg"
    },
    {
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i}
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
      >
        <path 
          fillRule="evenodd" 
          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" 
          clipRule="evenodd" 
        />
      </svg>
    ))
  }

  return (
    <main className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8 pt-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery - Left side */}
        <div className="flex flex-col">
          <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
            <img 
              src={product.images[0]} 
              alt={`${product.name}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Thumbnail images */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 2}`}
                  className="w-full h-full object-cover object-center hover:opacity-75 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product info - Right side */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <p className="text-3xl tracking-tight text-gray-900 mt-2">${product.price}</p>

          {/* Reviews */}
          <div className="mt-3">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                {product.rating}
                <span className="sr-only"> out of 5 stars</span>
              </p>
              <div className="ml-1 flex items-center">
                {renderStars(product.rating)}
              </div>
              <div className="ml-4 flex">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  See all {product.reviewCount} reviews
                </a>
              </div>
            </div>
          </div>

          <form className="mt-6">
            {/* Color picker */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <fieldset aria-label="Choose a color" className="mt-2">
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <label 
                      key={color.value}
                      className="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-2 ring-transparent focus:outline-none data-[checked]:ring-gray-900 data-[focus]:ring-2 data-[focus]:ring-gray-900 data-[focus]:ring-offset-2"
                    >
                      <input 
                        type="radio" 
                        name="color" 
                        value={color.value}
                        aria-label={color.name}
                        className="sr-only"
                        defaultChecked={color.value === 'black'}
                      />
                      <span 
                        className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${
                          color.value === 'black' ? 'bg-gray-900' : 'bg-gray-200'
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Size picker */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  See sizing chart
                </a>
              </div>

              <fieldset aria-label="Choose a size" className="mt-2">
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {product.sizes.map((size) => (
                    <label 
                      key={size.value}
                      className={`relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 ${
                        size.available 
                          ? 'bg-white shadow-sm text-gray-900 border-gray-200 hover:bg-gray-50 focus:outline-none ring-2 ring-transparent data-[checked]:bg-indigo-600 data-[checked]:text-white data-[checked]:border-indigo-600 data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2' 
                          : 'bg-gray-50 text-gray-200 cursor-not-allowed border-gray-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="size" 
                        value={size.value}
                        disabled={!size.available}
                        className="sr-only"
                        defaultChecked={size.value === 's'}
                      />
                      <span>{size.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
          </form>

          {/* Product details */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <p>{product.description}</p>
              <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-900">Fabric & Care</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <ul role="list">
                <li>Only the best materials</li>
                <li>Ethically and locally made</li>
                <li>Pre-washed and pre-shrunk</li>
                <li>Machine wash cold with similar colors</li>
              </ul>
            </div>
          </div>

          {/* Policies */}
          <section aria-labelledby="policies-heading" className="mt-8">
            <h2 id="policies-heading" className="sr-only">Our Policies</h2>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <dt>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    aria-hidden="true" 
                    className="mx-auto h-6 w-6 text-gray-400"
                  >
                    <path d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-900">International delivery</span>
                </dt>
                <dd className="mt-1 text-sm text-gray-500">Get your order in 2 years</dd>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <dt>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    aria-hidden="true" 
                    className="mx-auto h-6 w-6 text-gray-400"
                  >
                    <path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-900">Loyalty rewards</span>
                </dt>
                <dd className="mt-1 text-sm text-gray-500">Don't look at other tees</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {/* Reviews */}
      <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
        <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">Recent reviews</h2>
        <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          {reviews.map((review) => (
            <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                <div className="flex items-center xl:col-span-1">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    {review.rating}<span className="sr-only"> out of 5 stars</span>
                  </p>
                </div>

                <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                  <h3 className="text-sm font-medium text-gray-900">{review.title}</h3>
                  <div className="mt-3 space-y-6 text-sm text-gray-500">
                    {review.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium text-gray-900">{review.author}</p>
                <time dateTime="2021-01-06" className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
                  {review.date}
                </time>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related products */}
      <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
        <h2 id="related-heading" className="text-lg font-medium text-gray-900">Customers also purchased</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {relatedProducts.map((product, index) => (
            <div key={index} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img 
                  src={product.image} 
                  alt={`Front of ${product.name} in ${product.color}.`} 
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full" 
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#" className="hover:text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
