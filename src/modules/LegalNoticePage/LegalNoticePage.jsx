"use client";
import "./LegalNoticePage.scss";

const LegalNoticePage = () => {
  return (
    <main className="legal-notice">
      <div className="container">
        <h1 className="legal-notice__title">Mentions légales</h1>

        <div className="legal-notice__content">
          <section className="legal-notice__section">
            <p className="legal-notice__section-text">
              Ce document regroupe les principales informations légales
              relatives au site vitrine du Salon de Beauté{" "}
              <strong>BelleAura</strong>, exploité par la société fictive{" "}
              <strong>SAS BelleAura Beauté</strong>.
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">Éditeur du site</h2>
            <p className="legal-notice__section-text">
              Raison sociale : SAS BelleAura Beauté
            </p>
            <p className="legal-notice__section-text">
              Forme juridique : Société par actions simplifiée (SAS)
            </p>
            <p className="legal-notice__section-text">
              Adresse du siège social : 12, Avenue des Lavandes – 13012
              Marseille – France
            </p>
            <p className="legal-notice__section-text">
              SIRET : 000 000 000 00000 (données fictives)
            </p>
            <p className="legal-notice__section-text">
              TVA intracommunautaire : FR00 000 000 000 (données fictives)
            </p>
            <p className="legal-notice__section-text">
              Responsable de publication : Mme Claire Dupont (données fictives)
            </p>
            <p className="legal-notice__section-text">
              Contact : contact@belleaura-salon.fr (données fictives)
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">Hébergeur</h2>
            <p className="legal-notice__section-text">
              Nom : Hébergeur Fictif SAS
            </p>
            <p className="legal-notice__section-text">
              Adresse : 99, rue des Technologies – 75000 Paris – France
            </p>
            <p className="legal-notice__section-text">
              Site web : www.hebergeur-fictif.fr (données fictives)
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">Nous contacter</h2>
            <p className="legal-notice__section-text">
              Pour toute question concernant le site ou son contenu, vous pouvez
              écrire à : contact@belleaura-salon.fr (données fictives).
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">
              Propriété intellectuelle
            </h2>
            <p className="legal-notice__section-text">
              L’ensemble des contenus présents sur ce site (textes, visuels,
              logos, illustrations, images, médias) est la propriété exclusive
              du Salon de Beauté
              <strong> BelleAura</strong>, sauf mention contraire.
            </p>
            <p className="legal-notice__section-text">
              Toute reproduction ou adaptation, totale ou partielle, est
              interdite sans autorisation écrite préalable de l’éditeur.
            </p>
            <p className="legal-notice__section-text">
              Pour toute demande d’utilisation de contenus, merci de nous
              contacter.
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">
              Données personnelles
            </h2>
            <p className="legal-notice__section-text">
              Les traitements de données personnelles réalisés via ce site sont
              détaillés dans notre Politique de confidentialité, conformément au
              RGPD.
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">
              Règlement des litiges
            </h2>
            <p className="legal-notice__section-text">
              En cas de litige, les tribunaux compétents seront ceux du ressort
              de Marseille, sauf disposition légale contraire.
            </p>
            <p className="legal-notice__section-text">
              Les consommateurs peuvent également recourir gratuitement à un
              médiateur de la consommation pour tenter une résolution amiable.
            </p>
          </section>

          <section className="legal-notice__section">
            <h2 className="legal-notice__section-title">
              Mise à jour des mentions légales
            </h2>
            <p className="legal-notice__section-text">
              Ces mentions légales peuvent être modifiées à tout moment afin de
              respecter les obligations légales en vigueur.
            </p>
            <p className="legal-notice__section-text">
              Dernière mise à jour : Lundi 13 octobre 2025 (date fictive).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LegalNoticePage;
