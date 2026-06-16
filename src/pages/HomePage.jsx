import { lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection";
import LazyOnVisible from "../components/LazyOnVisible";

const FAQSection = lazy(() => import("../components/FAQSection"));
const UsageGuide = lazy(() => import("../components/UsageGuide"));

export default function HomePage({ onNavigate }) {
  return (
    <>
      <HeroSection onStart={() => onNavigate("/form-pajak")} />
      <LazyOnVisible minHeight={560} rootMargin="200px">
        <Suspense fallback={null}>
          <UsageGuide />
        </Suspense>
      </LazyOnVisible>
      <LazyOnVisible minHeight={520} rootMargin="200px">
        <Suspense fallback={null}>
          <FAQSection />
        </Suspense>
      </LazyOnVisible>
    </>
  );
}
