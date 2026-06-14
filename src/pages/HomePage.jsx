import FAQSection from "../components/FAQSection";
import HeroSection from "../components/HeroSection";
import UsageGuide from "../components/UsageGuide";

export default function HomePage({ onNavigate }) {
  return (
    <>
      <HeroSection onStart={() => onNavigate("/form-pajak")} />
      <UsageGuide />
      <FAQSection />
    </>
  );
}
