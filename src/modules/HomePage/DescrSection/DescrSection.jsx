"use client";
import "./DescrSection.scss";
import Image from "next/image";
const DescrSection = () => {
  return (
    <section className="descr-section">
      <div className="container">
        <div className="descr-section__icon-wrapper">
          <Image
            alt="Icône"
            src="/icon/descr-section-icon.svg"
            width={80}
            height={80}
            property="true"
          />
        </div>

        <h2>
          Découvrez un univers de beauté impeccable au salon « Delote-Beauty »
          sur l’île Krestovski. Nos spécialistes, forts de nombreuses années
          d’expérience, créeront pour vous un style unique qui mettra en valeur
          votre individualité. Offrez-vous l’excellence — votre transformation
          commence ici et maintenant !
        </h2>
      </div>
    </section>
  );
};

export default DescrSection;
