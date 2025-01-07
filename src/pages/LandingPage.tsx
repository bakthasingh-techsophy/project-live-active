import CTABanner from "@features/landingPage/CtaBanner";
import FAQSection from "@features/landingPage/FaqSection";
import LandingPageBanner from "@features/landingPage/LandingPageBanner";
import ServiceCarousel from "@features/landingPage/ServiceCarousel";
import ServicesSection from "@features/landingPage/ServicesSection";

const LandingPage = () => {
  return (
    <>
      {/* <Banner /> */}
      <LandingPageBanner />
      <ServicesSection />
      <ServiceCarousel />
      <FAQSection />
      <CTABanner />
    </>
  );
};

export default LandingPage;
