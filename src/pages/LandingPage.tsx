import { backgroundPic7 } from "@assets/index";
import CTABanner from "@features/landingPage/CtaBanner";
import FAQSection from "@features/landingPage/FaqSection";
import LandingPageBanner from "@features/landingPage/LandingPageBanner";
import ServiceCarousel from "@features/landingPage/ServiceCarousel";
import ServicesSection from "@features/landingPage/ServicesSection";

const LandingPage = () => {
  return (
    <>
      <LandingPageBanner />
      <ServicesSection />
      <ServiceCarousel />
      <FAQSection />
      <CTABanner backgroundImage={backgroundPic7} />
    </>
  );
};

export default LandingPage;
