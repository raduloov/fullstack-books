import { useRef, useState } from 'react';

import { BookSliderCard } from './BookSliderCard';
import { BASE_URL } from '../../apis/googleBooks';
import { ShowMoreButton } from './ShowMoreButton';
import { getSliderPosition, SliderPositions } from '../../utils/getSliderPosition';
import { ActivityIndicator } from './ActivityIndicator';
import { COLORS } from '../../utils/colors';
import { useAppSelector } from '../../hooks/useRedux';
import { ScreenSizes } from '../../layout/Layout';
import { useQuery } from 'react-query';

const MAX_ALLOWED_BOOKS_ON_PAGE = 5;
const MAX_ALLOWED_START_INDEX = 155;
const MOBILE_DEVICE_SCROLL = 500;

export enum ButtonDirections {
  LEFT = 'left',
  RIGHT = 'right'
}

interface Props {
  name: string;
}

export const LibrarySlider = ({ name }: Props) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderStartRef = useRef<HTMLDivElement | null>(null);
  const sliderEndRef = useRef<HTMLDivElement | null>(null);

  const { screenSize } = useAppSelector(state => state.ui);

  const fetchBooks = async () => {
    const response = await fetch(
      `${BASE_URL}?q=subject:${name}&startIndex=${startIndex}&maxResults=${MAX_ALLOWED_BOOKS_ON_PAGE}`
    );
    return await response.json();
  };

  const { data, isLoading } = useQuery([startIndex], fetchBooks);

  const loadMore = (direction: string) => {
    const sliderPosition = getSliderPosition(sliderRef);

    // TODO: Write a cleaner if-else logic
    if (direction === ButtonDirections.LEFT && startIndex !== 0) {
      if (sliderPosition === SliderPositions.START) {
        setStartIndex(prevState => prevState - MAX_ALLOWED_BOOKS_ON_PAGE);
      } else {
        if (screenSize === ScreenSizes.MOBILE && sliderRef.current) {
          sliderRef.current.scrollLeft -= MOBILE_DEVICE_SCROLL;
        } else {
          sliderStartRef.current?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      }
    }

    if (
      direction === ButtonDirections.RIGHT &&
      startIndex < MAX_ALLOWED_START_INDEX
    ) {
      if (sliderPosition === SliderPositions.END) {
        setStartIndex(prevState => prevState + MAX_ALLOWED_BOOKS_ON_PAGE);
      } else {
        if (screenSize === ScreenSizes.MOBILE && sliderRef.current) {
          sliderRef.current.scrollLeft += MOBILE_DEVICE_SCROLL;
        } else {
          sliderEndRef.current?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <div className="py-8 relative">
      <div className="flex justify-between items-center px-3">
        <h2 className="text-4xl sm:text-2xl font-bold dark:text-white">{name}</h2>
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
        className="flex overflow-x-scroll whitespace-nowrap h-64 sm:h-52"
      >
        <div className="h-60 sm:h-44 w-8 z-10 bg-gradient-to-r from-white to-transparent absolute dark:from-stone-800" />
        {!isLoading && data ? (
          <>
            <div ref={sliderStartRef} />
            {data.items.map((book: any, index: number) => (
              <BookSliderCard
                id={book.id}
                title={book.volumeInfo.title}
                imageUrl={book.volumeInfo.imageLinks?.thumbnail}
                author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
                category={
                  book.volumeInfo.categories && book.volumeInfo.categories[0]
                }
                url={book.volumeInfo.infoLink}
                key={index}
              />
            ))}
            <div ref={sliderEndRef} />
          </>
        ) : (
          <ActivityIndicator color={COLORS.ACCENT_COLOR_DARK_MODE} size={90} />
        )}
        <div className="h-60 w-8 z-10 bg-gradient-to-l from-white to-transparent absolute right-0 dark:from-stone-800" />
      </div>
    </div>
  );
};
