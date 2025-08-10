import WomenMegaMenu from './WomenMegaMenu'
import MenMegaMenu from './MenMegaMenu'

interface MobileSidebarProps {
  isOpen: boolean
  section: 'main' | 'women' | 'men'
  onClose: () => void
  onWomenClick: () => void
  onMenClick: () => void
  onBackClick: () => void
}

export default function MobileSidebar({ 
  isOpen, 
  section, 
  onClose, 
  onWomenClick, 
  onMenClick, 
  onBackClick 
}: MobileSidebarProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {section !== 'main' && (
            <button
              onClick={onBackClick}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <h2 className="text-lg font-medium text-gray-900 flex-1 text-center">
            {section === 'main' && 'Menu'}
            {section === 'women' && 'Women'}
            {section === 'men' && 'Men'}
          </h2>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {section === 'main' && (
            <div className="py-4">
              <nav className="space-y-1">
                <button
                  onClick={onWomenClick}
                  className="w-full text-left px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between"
                >
                  Women
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={onMenClick}
                  className="w-full text-left px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between"
                >
                  Men
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <a
                  href="#"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100"
                >
                  Company
                </a>
                
                <a
                  href="#"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100"
                >
                  Stores
                </a>

                <a
                  href="#"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100"
                >
                  About
                </a>

                <a
                  href="#"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100"
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
          
          {section === 'women' && (
            <div className="p-4 pb-8">
              <WomenMegaMenu />
            </div>
          )}
          
          {section === 'men' && (
            <div className="p-4 pb-8">
              <MenMegaMenu />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
