"use client";
import "./HomePage.scss";

import Hero from "./Hero/Hero";
import DescrSection from "./DescrSection/DescrSection";
import OurServices from "./OurServices/OurServices";
import BrandLogoSection from "./BrandLogoSection/BrandLogoSection";
import OurWorksSection from "./OurWorksSection/OurWorksSection";

const HomePage = () => {
  return (
    <main className="home-page">
      <Hero />
      <DescrSection />
      <OurServices />
      <BrandLogoSection />
      <OurWorksSection />
    </main>
  );
};

export default HomePage;
