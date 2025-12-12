"use client";
import "./PrivacyPolicyPage.scss";

const PrivacyPolicyPage = () => {
  return (
    <main className="privacy-policy">
      <div className="container">
        <h1 className="privacy-policy__title">Politique de confidentialité</h1>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <p className="privacy-policy__section-text">
              Cette politique décrit la manière dont le Salon de Beauté{" "}
              <strong>BelleAura</strong>
              collecte, utilise et protège vos données personnelles lors de
              l’utilisation de ce site et des services proposés (formulaire de
              contact, demandes de rendez-vous, échanges clients).
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Responsable du traitement
            </h2>
            <p className="privacy-policy__section-text">
              Responsable : SAS BelleAura Beauté (données fictives)
            </p>
            <p className="privacy-policy__section-text">
              Adresse : 12, Avenue des Lavandes – 13012 Marseille – France
            </p>
            <p className="privacy-policy__section-text">
              Email : contact@belleaura-salon.fr (données fictives)
            </p>
            <p className="privacy-policy__section-text">
              Téléphone : 00 00 00 00 00 (données fictives)
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Données collectées
            </h2>
            <p className="privacy-policy__section-text">
              Nous collectons uniquement les informations nécessaires au
              fonctionnement du service :
            </p>

            <ul className="privacy-policy__section-text">
              <li>
                Données du formulaire de rendez-vous : nom, e-mail, téléphone,
                date souhaitée, message facultatif.
              </li>
              <li>Données échangées par e-mail liées au suivi des demandes.</li>
              <li>
                Données de navigation strictement nécessaires au fonctionnement
                du site (cookies techniques, journaux anonymisés).
              </li>
            </ul>

            <p className="privacy-policy__section-text">
              Les champs facultatifs sont clairement indiqués lors de la
              collecte.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Finalités du traitement
            </h2>
            <p className="privacy-policy__section-text">
              Vos données sont utilisées pour :
            </p>

            <ul className="privacy-policy__section-text">
              <li>
                La gestion des demandes de rendez-vous et des échanges clients.
              </li>
              <li>Le suivi des prestations et la réponse à vos questions.</li>
              <li>
                Le respect des obligations légales applicables à l’activité.
              </li>
              <li>
                L’amélioration continue du site et de nos services (statistiques
                anonymisées).
              </li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Base légale du traitement
            </h2>
            <ul className="privacy-policy__section-text">
              <li>
                L’exécution de mesures précontractuelles ou contractuelles
                (prise de rendez-vous).
              </li>
              <li>
                Votre consentement pour toute communication commerciale
                (désinscription possible à tout moment).
              </li>
              <li>
                L’intérêt légitime du salon pour assurer la bonne gestion du
                site et la sécurité des échanges.
              </li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Destinataires des données
            </h2>
            <p className="privacy-policy__section-text">
              Les données collectées sont destinées exclusivement aux équipes
              internes de
              <strong> BelleAura</strong>. Elles peuvent être transmises à des
              prestataires techniques (hébergeur, services de messagerie) dans
              la mesure strictement nécessaire à l’exécution de leurs
              prestations.
            </p>
            <p className="privacy-policy__section-text">
              Ces prestataires sont soumis à une obligation de confidentialité.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Durée de conservation
            </h2>
            <ul className="privacy-policy__section-text">
              <li>
                Données liées aux demandes de rendez-vous : 3 ans après le
                dernier contact.
              </li>
              <li>
                Données nécessaires aux obligations légales : 10 ans
                (comptabilité).
              </li>
              <li>Cookies techniques : durée maximale de 13 mois.</li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">Vos droits</h2>
            <p className="privacy-policy__section-text">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>

            <ul className="privacy-policy__section-text">
              <li>Droit d’accès et de rectification.</li>
              <li>Droit d’effacement (« droit à l’oubli »).</li>
              <li>Droit d’opposition et de limitation du traitement.</li>
              <li>Droit à la portabilité des données.</li>
              <li>Droit de définir des directives après votre décès.</li>
            </ul>

            <p className="privacy-policy__section-text">
              Pour exercer vos droits : contact@belleaura-salon.fr (données
              fictives).
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Cookies et traceurs
            </h2>
            <p className="privacy-policy__section-text">
              Le site utilise uniquement des cookies nécessaires à son
              fonctionnement, ainsi que des cookies de mesure d’audience
              anonymisés. Une bannière d’information apparaît lors de votre
              première visite.
            </p>
            <p className="privacy-policy__section-text">
              Aucun outil d’analyse comportementale n’est actuellement activé.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">Sécurité</h2>
            <p className="privacy-policy__section-text">
              Nous mettons en place des mesures techniques et organisationnelles
              pour assurer la protection des données : chiffrement HTTPS, accès
              sécurisé, sauvegardes régulières.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">
              Mise à jour de la politique
            </h2>
            <p className="privacy-policy__section-text">
              Cette politique peut être modifiée pour refléter les évolutions
              légales ou nos services.
            </p>
            <p className="privacy-policy__section-text">
              Dernière mise à jour : Lundi 00 octobre 2025 (date fictive).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
