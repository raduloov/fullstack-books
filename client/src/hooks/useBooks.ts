import { toast } from 'react-toastify';
import { GRAPHQL_URL } from './../apis/graphql';
import { useAppDispatch } from './useRedux';
import { BookData } from './../@types/types';
import { favoritesActions } from '../store/favoritesSlice';

export const useBooks = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token');

  const addToFavorites = async (bookData: BookData) => {
    const graphqlQuery = {
      query: `
        mutation AddBookToFavorites($id: ID!, $title: String!, $author: String!, $imageUrl: String!, $category: String!, $url: String!) {
          addToFavorites(bookData: {id: $id, title: $title, author: $author, imageUrl: $imageUrl, category: $category, url: $url}) {
            id
            title
            author
            imageUrl
            category
            url
          }
        }
    `,
      variables: {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        imageUrl: bookData.imageUrl,
        category: bookData.category,
        url: bookData.url
      }
    };

    fetch(GRAPHQL_URL, {
      method: 'POST',
      body: JSON.stringify(graphqlQuery),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    dispatch(favoritesActions.addToFavorites(bookData));
    toast(`${bookData.title} added to your favorites!`, { icon: '❤️' });
  };

  const removeFromFavorites = async (bookId: string, bookTitle: string) => {
    const graphqlQuery = {
      query: `
        mutation RemoveBookFromFavorites($id: ID!) {
          removeFromFavorites(id: $id)
        }
      `,
      variables: {
        id: bookId
      }
    };
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    });

    dispatch(favoritesActions.removeFromFavorites(bookId));
    toast(`${bookTitle} removed from your favorites!`, {
      icon: '💔'
    });
  };

  const getFavoriteBooks = async () => {
    const graphqlQuery = {
      query: `
        query GetFavoriteBooks {
          favoriteBooks {
            id
            title
            author
            imageUrl
            category
            url
          }
        }
      `
    };

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    });
    const favoriteBooks = await response.json();

    return favoriteBooks;
  };

  return {
    addToFavorites,
    removeFromFavorites,
    getFavoriteBooks
  };
};
