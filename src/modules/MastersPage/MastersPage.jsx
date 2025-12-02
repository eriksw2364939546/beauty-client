"use client";
import "./MastersPage.scss";
import MasterCard from "@/components/MasterCard/MasterCard";
import Image from "next/image";

const MastersPage = () => {
  const masters = [
    {
      id: 1,
      name: "Анна Иванова",
      specialization: "Парикмахер-стилист",
      experience: "8 лет опыта",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Анна Иванова"
          width={400}
          height={477}
        />
      ),
    },
    {
      id: 2,
      name: "Мария Петрова",
      specialization: "Визажист",
      experience: "6 лет опыта",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Мария Петрова"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 3,
      name: "Елена Сидорова",
      specialization: "Косметолог",
      experience: "10 лет опыта",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Елена Сидорова"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 4,
      name: "Ольга Николаева",
      specialization: "Мастер маникюра",
      experience: "5 лет опыта",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Ольга Николаева"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 5,
      name: "Ирина Кузнецова",
      specialization: "Массажист",
      experience: "7 лет опыта",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Ирина Кузнецова"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 6,
      name: "Светлана Федорова",
      specialization: "SPA-терапевт",
      experience: "9 лет опыта",
      // Без image - будет использована дефолтная картинка
    },
  ];

  return (
    <main className="masters-page">
      <div className="container">
        <h1>Наши мастера</h1>
        <div className="masters-page__list">
          {masters.map((master) => (
            <MasterCard
              key={master.id}
              image={master.image}
              title={master.name}
              description={`${master.specialization} • ${master.experience}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MastersPage;
