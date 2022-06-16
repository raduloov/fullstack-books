import { CARD_BACKGROUND_COLORS } from './colors';

export const getRandomColor = () => {
  const randomIndex = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const randomColor = CARD_BACKGROUND_COLORS[randomIndex(0, 16)];

  return randomColor;
};
