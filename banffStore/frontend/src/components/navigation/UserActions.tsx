export default function UserActions() {
  return (
    <div className="flex items-center justify-end space-x-4">
      {/* Currency selector */}
      <div className="hidden lg:flex lg:items-center">
        <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gray-900">
          <img src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg" alt="" className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">CAD</span>
          <span className="sr-only">, change currency</span>
        </a>
      </div>

      {/* Search */}
      <button className="hidden lg:block p-2 text-gray-700 hover:text-gray-900">
        <span className="sr-only">Search</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>

      {/* Account */}
      <button className="p-2 text-gray-700 hover:text-gray-900">
        <span className="sr-only">Account</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
          <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>

      {/* Cart */}
      <div className="relative">
        <button className="group flex items-center p-2 text-gray-700 hover:text-gray-900">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
            <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
      </div>
    </div>
  )
}
