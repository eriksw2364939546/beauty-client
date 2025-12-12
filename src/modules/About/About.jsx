"use client";
import "./About.scss";

const About = () => {
  return (
    <main className="about-page">
      <div className="container">
        <h1>À propos</h1>
        <div className="about-page__content">
          <p>
            Situé à Marseille, notre salon de beauté propose une gamme complète
            de soins dédiés au bien-être, à l’esthétique et à la mise en valeur
            de votre image. Notre équipe de professionnels vous accueille dans
            un espace moderne et confortable pour vous offrir des services
            personnalisés, adaptés à vos besoins.
          </p>
          <p>
            Nous accordons une importance particulière à la qualité, à l’hygiène
            et à l’utilisation de produits haut de gamme afin de garantir une
            expérience agréable et des résultats durables. Que vous recherchiez
            un soin du visage, une mise en beauté, une coiffure ou un moment de
            détente, nous sommes à votre écoute pour vous accompagner.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
