const COLORS = [
  'rgba(239, 68, 68,0.5)',
  'rgba(249, 115, 22,0.5)',
  'rgba(245, 158, 11,0.5)',
  'rgba(234, 179, 8,0.5)',
  'rgba(132, 204, 22,0.5)',
  'rgba(34, 197, 94,0.5)',
  'rgba(16, 185, 129,0.5)',
  'rgba(20, 184, 166,0.5)',
  'rgba(6, 182, 212,0.5)',
  'rgba(14, 165, 233,0.5)',
  'rgba(59, 130, 246,0.5)',
  'rgba(99, 102, 241,0.5)',
  'rgba(139, 92, 246,0.5)',
  'rgba(168, 85, 247,0.5)',
  'rgba(217, 70, 239,0.5)',
  'rgba(236, 72, 153,0.5)',
  'rgba(244, 63, 94,0.5)'
];

const getRandomColor = () => {
  const randomIndex = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const randomColor = COLORS[randomIndex(0, 16)];

  return randomColor;
};

export default getRandomColor;
