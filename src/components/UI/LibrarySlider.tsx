import { useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import useFetch from '../../hooks/useFetch';
import BookSliderCard from './BookSliderCard';
import { BASE_URL } from '../../apis/googleBooks';
import ShowMoreButton from './ShowMoreButton';
import getSliderPosition, { SliderPositions } from '../../utils/getSliderPosition';
import ActivityIndicator from './ActivityIndicator';

const MAX_ALLOWED_BOOKS_ON_PAGE = 5;
const MAX_ALLOWED_START_INDEX = 155;

export enum ButtonDirections {
  LEFT = 'left',
  RIGHT = 'right'
}

interface Props {
  name: string;
}

const LibrarySlider = ({ name }: Props) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderStartRef = useRef<HTMLDivElement | null>(null);
  const sliderEndRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useFetch(
    `${BASE_URL}?q=subject:${name}&startIndex=${startIndex}&maxResults=${MAX_ALLOWED_BOOKS_ON_PAGE}`
  );

  const loadMore = (direction: string) => {
    const sliderPosition = getSliderPosition(sliderRef);

    if (direction === ButtonDirections.LEFT && startIndex !== 0) {
      if (sliderPosition === SliderPositions.START) {
        setStartIndex(prevState => prevState - MAX_ALLOWED_BOOKS_ON_PAGE);
      } else {
        sliderStartRef.current?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }

    if (
      direction === ButtonDirections.RIGHT &&
      startIndex < MAX_ALLOWED_START_INDEX
    ) {
      if (sliderPosition === SliderPositions.END) {
        setStartIndex(prevState => prevState + MAX_ALLOWED_BOOKS_ON_PAGE);
      } else {
        sliderEndRef.current?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center px-3">
        <h2 className="text-4xl font-bold">{name}</h2>
        <div className="flex mr-5">
          <ShowMoreButton
            direction={ButtonDirections.LEFT}
            onClick={loadMore}
            disabled={startIndex === 0}
          />
          <div className="w-5" />
          <ShowMoreButton
            direction={ButtonDirections.RIGHT}
            onClick={loadMore}
            disabled={startIndex >= MAX_ALLOWED_START_INDEX}
          />
        </div>
      </div>
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll whitespace-nowrap pb-5 h-60"
      >
        <div className="h-60 w-8 z-10 bg-gradient-to-r from-white to-transparent absolute" />
        {!isLoading && data ? (
          <>
            <div ref={sliderStartRef} />
            {data.items.map((book: any, index: number) => (
              <BookSliderCard
                title={book.volumeInfo.title}
                imageUrl={book.volumeInfo.imageLinks?.thumbnail}
                author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
                category={book.volumeInfo.categories}
                url={book.volumeInfo.infoLink}
                key={index}
              />
            ))}
            <div ref={sliderEndRef} />
          </>
        ) : (
          <ActivityIndicator color="#8b5cf6" size={90} />
        )}
        <div className="h-60 w-8 z-10 bg-gradient-to-l from-white to-transparent absolute right-0" />
      </div>
    </div>
  );
};

export default LibrarySlider;
