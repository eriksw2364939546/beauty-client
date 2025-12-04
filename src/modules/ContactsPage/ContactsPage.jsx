"use client";
import "./ContactsPage.scss";

const ContactsPage = () => {
  return (
    <main className="contacts-page">
      <div className="container">
        <h1>Contacts</h1>
        <div className="contacts-page__wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d725.5648646464525!2d5.429252413463283!3d43.32975946974634!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sfr!4v1764782548847!5m2!1sru!2sfr"
            width="600"
            height="576"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="contacts-page__items">
          <div className="contacts-page__item">
            <h3>Contacts</h3>
            <p>+7 (812) 123-45-67</p>
            <p>+7 (911) 123-45-67</p>
            <p>Prospekt Novoostrovski, bâtiment 36 lit. C</p>
          </div>
          <div className="contacts-page__item">
            <h3>Heures d'ouverture</h3>
            <p>De 10:00 à 21:00 (Lun–Ven)</p>
            <p>De 11:00 à 20:00 (Sam–Dim)</p>
          </div>
          <div className="contacts-page__item">
            <h3>Contacts</h3>
            <p>+7 (812) 123-45-67</p>
            <p>+7 (911) 123-45-67</p>
            <p>Prospekt Novoostrovski, bâtiment 36 lit. C</p>
          </div>
          <div className="contacts-page__item">
            <h3>Heures d'ouverture</h3>
            <p>De 10:00 à 21:00 (Lun–Ven)</p>
            <p>De 11:00 à 20:00 (Sam–Dim)</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactsPage;
