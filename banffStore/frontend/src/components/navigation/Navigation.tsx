import Header from './Header'
import MobileMenu from './MobileMenu'
import MobileSidebar from './MobileSidebar'
import DesktopNavigation from './DesktopNavigation'
import UserActions from './UserActions'
import MegaMenuOverlay from './MegaMenuOverlay'
import { useNavigation } from '../../hooks/useNavigation'
import WomenMegaMenu from './WomenMegaMenu'
import MenMegaMenu from './MenMegaMenu'

interface NavigationProps {
  onNavigateBack?: () => void
}

export default function Navigation({ onNavigateBack }: NavigationProps) {
  const {
    isWomenSectionOpen,
    isMenSectionOpen,
    isMobileMenuOpen,
    mobileSection,
    toggleWomenSection,
    toggleMenSection,
    closeAllSections,
    toggleMobileMenu,
    openMobileWomenSection,
    openMobileMenSection,
    closeMobileMenu,
    goBackToMobileMain,
  } = useNavigation()

  return (
    <>
      <nav aria-label="Top" className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Header 
              onNavigateBack={onNavigateBack}
              onMobileMenuToggle={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
            />
            <MobileMenu />
            <DesktopNavigation onWomenClick={toggleWomenSection} onMenClick={toggleMenSection} />
            <UserActions />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        section={mobileSection}
        onClose={closeMobileMenu}
        onWomenClick={openMobileWomenSection}
        onMenClick={openMobileMenSection}
        onBackClick={goBackToMobileMain}
      />

      {/* Desktop Mega Menu Overlays */}
      <MegaMenuOverlay 
        isOpen={isWomenSectionOpen} 
        title="Women's Collection" 
        onClose={closeAllSections}
      >
        <WomenMegaMenu />
      </MegaMenuOverlay>

      <MegaMenuOverlay 
        isOpen={isMenSectionOpen} 
        title="Men's Collection" 
        onClose={closeAllSections}
      >
        <MenMegaMenu />
      </MegaMenuOverlay>
    </>
  )
}
