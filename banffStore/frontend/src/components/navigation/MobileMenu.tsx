interface MobileMenuProps {
  // This component shows only Banff text in center on mobile/tablet
}

export default function MobileMenu({ }: MobileMenuProps) {
  return (
    <div className="flex items-center lg:hidden absolute left-1/2 transform -translate-x-1/2">
      {/* Mobile/Tablet - Show only Banff text in center */}
      <span className="text-xl font-bold text-gray-900">Banff</span>
    </div>
  )
}
