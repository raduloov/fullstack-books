import React from 'react';

interface Props {
  mode: string;
}

export const ThemeIcon = ({ mode }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <p>{mode}</p>
    </div>
  );
};
