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
            <h3>Контакты</h3>

            <p>+7 (812) 123-45-67</p>
            <p>+7 (812) 123-45-67</p>
            <p>Новоостровский проспект, дом 36 лит. С</p>
          </div>

          <div className="footer__items">
            <h3>Режим работы</h3>
            <p>C 10:00 до 21:00 (Пн-Пт)</p>
            <p>С 11:00 до 20:00 (Сб-Вс)</p>
          </div>

          <div className="footer__items">
            <h3>Мы в Instagram</h3>
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
