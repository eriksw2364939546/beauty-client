"use client";
import "./ServiceList.scss";
import PriceItem from "@/components/PriceItem/PriceItem";

const ServiceList = ({ category }) => {
  // Моковые данные (в будущем с бекенда)
  const servicesByCategory = {
    hairdressing: [
      {
        id: 1,
        title: "Женская укладка",
        price: "1 000 ₽",
        description: "+ обработка кончиков волос",
      },
      {
        id: 2,
        title: "Стрижка женская",
        price: "1 500 ₽",
        description: "+ мытье головы",
      },
      {
        id: 3,
        title: "Окрашивание волос",
        price: "3 500 ₽",
        description: "+ тонирование",
      },
      {
        id: 4,
        title: "Мелирование",
        price: "4 000 ₽",
        description: "+ уход за волосами",
      },
      {
        id: 5,
        title: "Кератиновое выпрямление",
        price: "5 000 ₽",
        description: "+ консультация",
      },
    ],
    nails: [
      {
        id: 6,
        title: "Маникюр классический",
        price: "800 ₽",
        description: "+ покрытие лаком",
      },
      {
        id: 7,
        title: "Педикюр аппаратный",
        price: "1 200 ₽",
        description: "+ обработка стоп",
      },
      {
        id: 8,
        title: "Наращивание ногтей",
        price: "2 500 ₽",
        description: "+ дизайн",
      },
      {
        id: 9,
        title: "Гель-лак",
        price: "1 000 ₽",
        description: "+ снятие старого покрытия",
      },
    ],
    // Добавь остальные категории...
  };

  const services = servicesByCategory[category] || [];

  return (
    <div className="service-list">
      {services.map((service) => (
        <PriceItem
          key={service.id}
          title={service.title}
          price={service.price}
          description={service.description}
        />
      ))}
    </div>
  );
};

export default ServiceList;
