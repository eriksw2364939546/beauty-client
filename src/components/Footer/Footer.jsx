"use client";
import "./Footer.scss";
import Image from "next/image";

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

            <p>+7 (812) 123-45-67</p>
            <p>+7 (812) 123-45-67</p>
            <p>Prospekt Novoostrovski, bâtiment 36 lit. C</p>
          </div>

          <div className="footer__items">
            <h3>Heures d'ouverture</h3>
            <p>De 10:00 à 21:00 (Lun–Ven)</p>
            <p>De 11:00 à 20:00 (Sam–Dim)</p>
          </div>

          <div className="footer__items">
            <h3>Nous sur Instagram</h3>
            <Image
              alt="Logo"
              src="/icon/logo.svg"
              width={36}
              height={36}
              property="true"
            />
          </div>
        </div>
        <div className="footer__bottom">
          <p>Copyright © 2017 - 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
