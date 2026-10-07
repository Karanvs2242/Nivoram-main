import { useEffect, Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { initLenis } from "@/lib/lenis";

import Home from "@/pages/Home";
import Collections from "@/pages/Collections";
import CollectionDetail from "@/pages/CollectionDetail";
import ProductDetail from "@/pages/ProductDetail";
import OurStory from "@/pages/OurStory";
import CorporateGifting from "@/pages/CorporateGifting";
import Contact from "@/pages/Contact";
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
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<CollectionDetail />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/corporate-gifting" element={<CorporateGifting />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<JournalArticle />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/terms-conditions" element={<Terms />} />
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