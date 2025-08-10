import { useState } from 'react'

export function useNavigation() {
  const [isWomenSectionOpen, setIsWomenSectionOpen] = useState(false)
  const [isMenSectionOpen, setIsMenSectionOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<'main' | 'women' | 'men'>('main')

  const openWomenSection = () => {
    setIsWomenSectionOpen(true)
    setIsMenSectionOpen(false)
    setIsMobileMenuOpen(false)
  }

  const openMenSection = () => {
    setIsMenSectionOpen(true)
    setIsWomenSectionOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleWomenSection = () => {
    setIsWomenSectionOpen(!isWomenSectionOpen)
    setIsMenSectionOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMenSection = () => {
    setIsMenSectionOpen(!isMenSectionOpen)
    setIsWomenSectionOpen(false)
    setIsMobileMenuOpen(false)
  }

  const closeAllSections = () => {
    setIsWomenSectionOpen(false)
    setIsMenSectionOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsWomenSectionOpen(false)
    setIsMenSectionOpen(false)
    setMobileSection('main')
  }

  const openMobileWomenSection = () => {
    setMobileSection('women')
  }

  const openMobileMenSection = () => {
    setMobileSection('men')
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setMobileSection('main')
  }

  const goBackToMobileMain = () => {
    setMobileSection('main')
  }

  return {
    isWomenSectionOpen,
    isMenSectionOpen,
    isMobileMenuOpen,
    mobileSection,
    openWomenSection,
    openMenSection,
    toggleWomenSection,
    toggleMenSection,
    closeAllSections,
    toggleMobileMenu,
    openMobileWomenSection,
    openMobileMenSection,
    closeMobileMenu,
    goBackToMobileMain,
  }
}
