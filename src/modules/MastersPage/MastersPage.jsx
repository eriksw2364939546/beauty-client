"use client";
import "./MastersPage.scss";
import MasterCard from "@/components/MasterCard/MasterCard";
import Image from "next/image";

const MastersPage = () => {
  const masters = [
    {
      id: 1,
      name: "Anna Ivanova",
      specialization: "Coiffeuse-styliste",
      experience: "8 ans d’expérience",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Anna Ivanova"
          width={400}
          height={477}
        />
      ),
    },
    {
      id: 2,
      name: "Maria Petrova",
      specialization: "Maquilleuse",
      experience: "6 ans d’expérience",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Maria Petrova"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 3,
      name: "Elena Sidorova",
      specialization: "Esthéticienne",
      experience: "10 ans d’expérience",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Elena Sidorova"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 4,
      name: "Olga Nikolaeva",
      specialization: "Prothésiste ongulaire",
      experience: "5 ans d’expérience",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Olga Nikolaeva"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 5,
      name: "Irina Kouznetsova",
      specialization: "Massothérapeute",
      experience: "7 ans d’expérience",
      image: (
        <Image
          src="/Img/master-default-image.png"
          alt="Irina Kouznetsova"
          width={396}
          height={500}
        />
      ),
    },
    {
      id: 6,
      name: "Svetlana Fedorova",
      specialization: "Thérapeute SPA",
      experience: "9 ans d’expérience",
      // Без image - будет использована дефолтная картинка
    },
  ];

  return (
    <main className="masters-page">
      <div className="container">
        <h1>Nos maîtres</h1>
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
