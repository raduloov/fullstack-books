import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  color: string;
  size: number;
}

const ActivityIndicator = ({ color, size }: Props) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ThreeDots color={color} height={size} width={size} />
    </div>
  );
};

export default ActivityIndicator;
