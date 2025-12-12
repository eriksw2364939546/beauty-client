"use client";
import "./Footer.scss";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__elements">
          <div className="footer__items">
            <div className="footer__items-image__wrapper">
              <Image
                alt="Logo"
                src="/icon/header-sublogo.svg"
                width={60}
                height={60}
                priority={true}
              />
            </div>
          </div>

          <div className="footer__items">
            <h3>Contacts</h3>

            <p>07 82 41 39 56</p>
            <p>06 17 94 22 08</p>
            <p>Prospekt Novoostrovski, bâtiment 36 lit. C</p>
          </div>

          <div className="footer__items">
            <h3>Heures d'ouverture</h3>
            <p>De 10:00 à 21:00 (Lun–Ven)</p>
            <p>De 11:00 à 20:00 (Sam–Dim)</p>
          </div>

          <div className="footer__items">
            <h3>Autres pages</h3>
            <Link href="/legal-notice">Mentions légales</Link>
            <Link href="/privacy-policy">Politique de confidentialité</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <p>Tous droits réservés. © 2017 - 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
