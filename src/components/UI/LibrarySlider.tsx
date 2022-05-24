import useFetch from '../../hooks/useFetch';

import BookSliderCard from './BookSliderCard';
import { BASE_URL } from '../../apis/googleBooks';
import ShowMoreButton from './ShowMoreButton';

const MAX_ALLOWED_BOOKS_ON_PAGE = 6;

interface Props {
  name: string;
}

const NavbarSectionCard = ({ name }: Props) => {
  const { data, isLoading, error } = useFetch(
    `${BASE_URL}/?q=subject:${name}&startIndex00&maxResults=${MAX_ALLOWED_BOOKS_ON_PAGE}`
  );

  return (
    <div className="py-8">
      <div className="flex justify-between items-center px-3">
        <h2 className="text-4xl font-bold">{name}</h2>
        <ShowMoreButton />
      </div>
      <div className="flex overflow-x-scroll whitespace-nowrap pb-5">
        <div className="h-60 w-8 z-10 bg-gradient-to-r from-white to-transparent absolute" />
        {!isLoading ? (
          data?.items.map((book: any, index: number) => (
            <BookSliderCard
              title={book.volumeInfo.title}
              imageUrl={book.volumeInfo.imageLinks?.thumbnail}
              author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
              category={book.volumeInfo.categories[0]}
              url={book.volumeInfo.infoLink}
              key={index}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
        <div className="h-60 w-8 z-10 bg-gradient-to-l from-white to-transparent absolute right-0" />
      </div>
    </div>
  );
};

export default NavbarSectionCard;
