"use client";
import "./ContactsPage.scss";

const ContactsPage = () => {
  return (
    <main className="contacts-page">
      <div className="container">
        <h1>Контакты</h1>
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
            <h3>Контакты</h3>
            <p>+7 (812) 123-45-67</p>
            <p>+7 (911) 123-45-67</p>
            <p>Новоостровский проспект, дом 36 лит. С</p>
          </div>
          <div className="contacts-page__item">
            <h3>Режим работы</h3>
            <p>C 10:00 до 21:00 (Пн-Пт)</p>
            <p>С 11:00 до 20:00 (Сб-Вс)</p>
          </div>
          <div className="contacts-page__item">
            <h3>Контакты</h3>
            <p>+7 (812) 123-45-67</p>
            <p>+7 (911) 123-45-67</p>
            <p>Новоостровский проспект, дом 36 лит. С</p>
          </div>
          <div className="contacts-page__item">
            <h3>Режим работы</h3>
            <p>C 10:00 до 21:00 (Пн-Пт)</p>
            <p>С 11:00 до 20:00 (Сб-Вс)</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactsPage;
