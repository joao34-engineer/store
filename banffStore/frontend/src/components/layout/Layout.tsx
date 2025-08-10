import Navigation from '../navigation/Navigation'

interface LayoutProps {
  children: React.ReactNode
  onNavigateBack?: () => void
}

export default function Layout({ children, onNavigateBack }: LayoutProps) {
  return (
    <>
      <Navigation onNavigateBack={onNavigateBack} />
      <div className="min-h-screen bg-white pt-16">
        {children}
      </div>
    </>
  )
}
