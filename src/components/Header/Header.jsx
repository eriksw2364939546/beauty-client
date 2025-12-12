"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-items__wrapper row">
          <div className="header-logo">
            <Link href="/" onClick={closeMenu}>
              <Image
                alt="Logo"
                src="/icon/logo.svg"
                width={24}
                height={24}
                priority={true}
              />
            </Link>
          </div>

          {/* Центральный логотип для мобильной версии */}
          <div className="header-logo-mobile">
            <Link href="/" onClick={closeMenu}>
              <Image
                alt="Header sublogo"
                src="/icon/header-sublogo.svg"
                width={40}
                height={40}
                priority={true}
              />
            </Link>
          </div>

          <nav
            className={`header-nav ${isMenuOpen ? "header-nav--active" : ""}`}
          >
            <div className="header-nav__elems">
              <Link href="/" onClick={closeMenu}>
                Accueil
              </Link>
              <Link href="/masters" onClick={closeMenu}>
                Maîtres
              </Link>
              <Link href="/products" onClick={closeMenu}>
                Cosmétique
              </Link>
            </div>

            <div className="header-nav__elems">
              <Link href="#" onClick={closeMenu}>
                <Image
                  alt="Header sublogo"
                  src="/icon/header-sublogo.svg"
                  width={40}
                  height={40}
                  priority={true}
                />
              </Link>
            </div>

            <div className="header-nav__elems">
              <Link href="/prices" onClick={closeMenu}>
                Prix
              </Link>
              <Link href="/about" onClick={closeMenu}>
                À propos
              </Link>
              <Link href="/contacts" onClick={closeMenu}>
                Contacts
              </Link>
            </div>
          </nav>

          {/* Бургер кнопка */}
          <button
            className={`burger-menu ${isMenuOpen ? "burger-menu--active" : ""}`}
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Оверлей ТОЛЬКО когда меню открыто */}
          {isMenuOpen && (
            <div className="menu-overlay" onClick={closeMenu}></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
