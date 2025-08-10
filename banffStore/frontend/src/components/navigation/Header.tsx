interface HeaderProps {
  onNavigateBack?: () => void
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export default function Header({ 
  onNavigateBack, 
  onMobileMenuToggle, 
  isMobileMenuOpen 
}: HeaderProps) {
  return (
    <div className="flex items-center">
      {/* Desktop - Show logo and text */}
      <button 
        onClick={onNavigateBack} 
        className="hidden lg:flex items-center bg-transparent border-none cursor-pointer hover:opacity-75 transition-opacity group"
        title="Back to Home"
      >
        <span className="sr-only">Back to Home</span>
        <img 
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" 
          alt="Banff Store" 
          className="h-8 w-auto group-hover:scale-105 transition-transform" 
        />
        <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          Banff
        </span>
      </button>

      {/* Mobile/Tablet - Show hamburger menu and search icon on the left */}
      <div className="flex items-center lg:hidden space-x-2">
        <button 
          type="button" 
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          aria-expanded={isMobileMenuOpen}
          onClick={onMobileMenuToggle}
        >
          <span className="sr-only">Open menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>

        <button className="p-2 text-gray-700 hover:text-gray-900">
          <span className="sr-only">Search</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
