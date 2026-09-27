import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { PRODUCTS } from './data/catalog';
import { UtilityBar } from './components/UtilityBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryCarousel } from './components/CategoryCarousel';
import { ProductGrid } from './components/ProductGrid';
import { SettingServicesSection } from './components/SettingServicesSection';
import { LookbookSection } from './components/LookbookSection';
import { HouseBrandsSection } from './components/HouseBrandsSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { LookbookModal } from './components/LookbookModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AtelierLocationsModal } from './components/AtelierLocationsModal';
import { HowToOrderModal } from './components/HowToOrderModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { Toast } from './components/Toast';

export function StoreContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('all');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    scrollToSection('products-section');
  };

  const handleSelectBrand = (brandName: string) => {
    setSelectedCategory('all');
    scrollToSection('products-section');
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
      {/* 1. Aarong-style Navy Utility Bar */}
      <UtilityBar />

      {/* 2. Top Bar (Top Bar Contract: Zone 1 Wordmark, Zone 2 Nav, Zone 3 Actions) */}
      <Header
        onNavigateSection={scrollToSection}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 3. Full-Bleed Campaign Hero Banner */}
        <HeroBanner
          onExploreClick={() => scrollToSection('products-section')}
          onBookServiceClick={() => scrollToSection('services-section')}
        />

        {/* 4. Curated Department Category Carousel */}
        <CategoryCarousel
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          onSelectServiceTab={() => scrollToSection('services-section')}
        />

        {/* 5. Featured Gadget Collection Product Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 6. First-Class Device Setting Atelier (Technician Visits) */}
        <SettingServicesSection />

        {/* 7. The Editorial Lookbook Stories */}
        <LookbookSection />

        {/* 8. Dedicated House Brands Showcase */}
        <HouseBrandsSection onSelectBrand={handleSelectBrand} />
      </main>

      {/* 9. Comprehensive Atelier Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Interactive Overlays & Modals */}
      <QuickViewModal />
      <ServiceBookingModal />
      <LookbookModal />
      <CartDrawer />
      <CheckoutModal />
      <SearchModal />
      <WishlistDrawer />
      <AtelierLocationsModal />
      <HowToOrderModal />
      <TrackOrderModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
