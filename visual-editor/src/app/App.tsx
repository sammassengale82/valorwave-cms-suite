// src/app/App.tsx
import React, { useEffect } from "react";

// Theme + UI
import { ThemeProvider } from "../themes/ThemeManager";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import PreviewContainer from "../editor/PreviewContainer";
import InspectorPanel from "../inspector/InspectorPanel";

// Canvas state
import { useCanvasState } from "../canvas/CanvasState";

// ⭐ Import ALL section components here (NOT in the iframe)
import HeaderSection from "../components/sections/HeaderSection";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import ServiceAreaSection from "../components/sections/ServiceAreaSection";
import BioSection from "../components/sections/BioSection";
import WeddingDJSection from "../components/sections/WeddingDJSection";
import FAQSection from "../components/sections/FAQSection";
import BrandMeaningSection from "../components/sections/BrandMeaningSection";
import HeroDiscountSection from "../components/sections/HeroDiscountSection";
import CalendarSection from "../components/sections/CalendarSection";
import TestimonialFormSection from "../components/sections/TestimonialFormSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FooterSection from "../components/sections/FooterSection";
import SEOSection from "../components/sections/SEOSection";
import GoogleSection from "../components/sections/GoogleSection";

// ⭐ Inject components into global scope for the iframe
// The iframe will read these via window.__SECTION_COMPONENTS__
(window.top as any).__SECTION_COMPONENTS__ = {
  HeaderSection,
  HeroSection,
  ServicesSection,
  ServiceAreaSection,
  BioSection,
  WeddingDJSection,
  FAQSection,
  BrandMeaningSection,
  HeroDiscountSection,
  CalendarSection,
  TestimonialFormSection,
  TestimonialsSection,
  FooterSection,
  SEOSection,
  GoogleSection,
};

export default function App() {
  useEffect(() => {
    // ⭐ Load template.data.json → CanvasState.tree
    useCanvasState.getState().init();
  }, []);

  return (
    <ThemeProvider>
      <ThemeSwitcher />

      <div className="app-container">
        <div className="app-main">

          {/* Inspector MUST be first so it sits on the LEFT */}
          <InspectorPanel />

          {/* Preview MUST be second so it expands on the RIGHT */}
          <div className="right-panel">
            <PreviewContainer mode="preview" />
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}
