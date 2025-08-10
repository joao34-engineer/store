interface DesktopNavigationProps {
  onWomenClick: () => void
  onMenClick: () => void
}

export default function DesktopNavigation({ onWomenClick, onMenClick }: DesktopNavigationProps) {
  return (
    <div className="hidden lg:flex lg:items-center lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
      <button 
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
        onClick={onWomenClick}
      >
        Women
      </button>
      
      <button 
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
        onClick={onMenClick}
      >
        Men
      </button>

      <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">Company</a>
      <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">Stores</a>
    </div>
  )
}
