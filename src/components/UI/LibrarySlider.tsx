import React from 'react';
import BookSliderCard from './BookSliderCard';

interface Props {
  name: string;
}

const NavbarSectionCard = ({ name }: Props) => {
  return (
    <div>
      <h2 className="text-4xl font-bold">{name}</h2>
      <div className="overflow-x-scroll">
        <BookSliderCard name="" imageUrl="" author="" category="" />
      </div>
    </div>
  );
};

export default NavbarSectionCard;
