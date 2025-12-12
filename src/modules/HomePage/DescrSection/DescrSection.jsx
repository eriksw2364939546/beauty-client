"use client";
import "./DescrSection.scss";
import Image from "next/image";

const DescrSection = () => {
  return (
    <section className="descr-section" aria-label="À propos de notre salon">
      <div className="container">
        <div className="descr-section__icon-wrapper">
          <Image
            alt="Icône élégante représentant l'excellence en beauté"
            src="/icon/descr-section-icon.svg"
            width={80}
            height={80}
            priority={true}
          />
        </div>

        <h2>
          Découvrez un univers de beauté impeccable au salon{" "}
          <strong>Delote-Beauty</strong> au cœur de <strong>Marseille</strong>.
          Nos spécialistes, forts de nombreuses années d'expérience, créeront
          pour vous un style unique qui mettra en valeur votre individualité.
          Offrez-vous l'excellence — votre transformation commence ici et
          maintenant !
        </h2>
      </div>
    </section>
  );
};

export default DescrSection;
