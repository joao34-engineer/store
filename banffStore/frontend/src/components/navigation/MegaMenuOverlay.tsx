interface MegaMenuOverlayProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function MegaMenuOverlay({ isOpen, title, onClose, children }: MegaMenuOverlayProps) {
  if (!isOpen) return null

  return (
    <div className="hidden lg:block fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-30 shadow-lg overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
