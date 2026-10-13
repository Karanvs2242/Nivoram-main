import { useEffect, Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { initLenis } from "@/lib/lenis";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Collections from "@/pages/Collections";
import CollectionDetail from "@/pages/CollectionDetail";
import OccasionGifts from "@/pages/OccasionGifts";
import GiftFinder from "@/pages/GiftFinder";
import ProductDetail from "@/pages/ProductDetail";
import OurStory from "@/pages/OurStory";
import WhyNivoram from "@/pages/WhyNivoram";
import Craftsmanship from "@/pages/Craftsmanship";
import CorporateGifting from "@/pages/CorporateGifting";
import Contact from "@/pages/Contact";
import CustomOrders from "@/pages/CustomOrders";
import FAQs from "@/pages/FAQs";
import Journal from "@/pages/Journal";
import JournalArticle from "@/pages/JournalArticle";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream px-6">
          <div className="text-center max-w-md">
            <p className="text-[11px] uppercase tracking-[0.3em] text-terra mb-4">Something went wrong</p>
            <p className="text-[14px] text-ink/60">
              Please refresh the page. If it persists, reach us at the contact page.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <div className="App grain min-h-screen bg-cream text-ink">
      <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Shop */}
              <Route path="/shop" element={<Shop mode="all" />} />
              <Route path="/shop/new-arrivals" element={<Shop mode="new" />} />
              <Route path="/shop/bestsellers" element={<Shop mode="bestsellers" />} />

              {/* Collections */}
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<CollectionDetail />} />

              {/* Gifting by occasion */}
              <Route path="/gift-finder" element={<GiftFinder />} />
              <Route path="/gifts/:key" element={<OccasionGifts />} />

              {/* Products */}
              <Route path="/products/:slug" element={<ProductDetail />} />

              {/* About Us */}
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/why-nivoram" element={<WhyNivoram />} />
              <Route path="/craftsmanship" element={<Craftsmanship />} />

              {/* Corporate */}
              <Route path="/corporate-gifting" element={<CorporateGifting />} />

              {/* Contact */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact/custom-orders" element={<CustomOrders />} />
              <Route path="/faqs" element={<FAQs />} />

              {/* Journal */}
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<JournalArticle />} />

              {/* Legal */}
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/terms-conditions" element={<Terms />} />

              {/* Redirects from the previous collection structure */}
              <Route path="/collections/spiritual-pooja-decor" element={<Navigate to="/collections/sacred-elegance" replace />} />
              <Route path="/collections/statement-home-decor" element={<Navigate to="/collections/statement-decor" replace />} />
              <Route path="/collections/wedding-anniversary-gifts" element={<Navigate to="/gifts/weddings" replace />} />
              <Route path="/collections/festive-occasion-gifts" element={<Navigate to="/gifts/festive" replace />} />
              <Route path="/collections/corporate-bulk-gifting" element={<Navigate to="/corporate-gifting" replace />} />
              <Route path="/collections/timeless-accents" element={<Navigate to="/collections/statement-decor" replace />} />
              <Route path="/collections/frames-keepsakes" element={<Navigate to="/collections/thoughtful-gifting" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </BrowserRouter>
      </ErrorBoundary>
      <Toaster position="bottom-center" richColors={false} />
    </div>
  );
}