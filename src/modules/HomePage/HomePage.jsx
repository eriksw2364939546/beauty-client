"use client";
import "./HomePage.scss";

import Hero from "./Hero/Hero";
import DescrSection from "./DescrSection/DescrSection";
import OurServices from "./OurServices/OurServices";
import BrandLogoSection from "./BrandLogoSection/BrandLogoSection";
import OurWorksSection from "./OurWorksSection/OurWorksSection";

const HomePage = ({ services, works }) => {
  return (
    <main className="home-page">
      <Hero />
      <DescrSection />
      <OurServices services={services} />
      <BrandLogoSection />
      <OurWorksSection services={services} initialWorks={works} />
    </main>
  );
};

export default HomePage;
