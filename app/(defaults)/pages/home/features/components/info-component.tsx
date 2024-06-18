import React, { FC } from "react";

interface CardData {
  id: number;
  amount: string;
  title: string;
  description: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    amount: "$390M",
    title: "Property Sales",
    description:
      "Cras pulvinar ultricies vehicula cras et nulla id lorem vulputate pulvinar eget non neque.",
  },
  {
    id: 2,
    amount: "+1,290",
    title: "Active Listings",
    description:
      "Cras pulvinar ultricies vehicula cras et nulla id lorem vulputate pulvinar eget non neque.",
  },
  {
    id: 3,
    amount: "210x",
    title: "Revenue Growth",
    description:
      "Cras pulvinar ultricies vehicula cras et nulla id lorem vulputate pulvinar eget non neque.",
  },
];

const LikeCard: FC<{ card: CardData }> = ({ card }) => (
  <div className="max-w-sm mx-auto my-6">
    <div className="relative overflow-hidden rounded-t-lg bg-accent/20 p-6">
      <div data-aos="fade-up">
        <h1 className="text-4xl my-2 text-white font-bold">{card.amount}</h1>
        <p className="text-2xl my-2 text-white">{card.title}</p>
        <p className="my-2 text-white font-semibold">{card.description}</p>
      </div>
    </div>
  </div>
);

const DataInfoComponent: FC = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto relative py-10">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card) => (
            <LikeCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataInfoComponent;
