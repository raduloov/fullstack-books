import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authActions } from './../store/authSlice';
import { favoritesActions } from './../store/favoritesSlice';
import { useAppDispatch } from './useRedux';
import { GRAPHQL_URL } from '../apis/graphql';
import { LoginAuthData, SignUpAuthData } from './../@types/types';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Reset error state to null to avoid error message spam after initial message
  error && setError(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const checkIsAuth = (): void | boolean => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    if (!token || !expiryDate) {
      signOut();
      dispatch(authActions.setIsAuth(false));
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      signOut();
      dispatch(authActions.setIsAuth(false));
      return;
    }

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    if (remainingMilliseconds > 0) {
      dispatch(authActions.setIsAuth(true));
      return;
    }
  };

  const getUserData = async () => {
    const token = localStorage.getItem('token');

    const graphqlQuery = {
      query: `
        {
          user {
            name
            email
            favoriteBooks {
              id
              title
              author
              imageUrl
              category
              url
            }
          }
        }
      `
    };

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      });
      const { data } = await response.json();

      // dispatch(authActions.setUser(data));
      // dispatch(favoritesActions.setFavoriteBooks(data.favoriteBooks));

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async (authData: LoginAuthData) => {
    const graphqlQuery = {
      query: `
        query UserLogin($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            userId
          }
        }
      `,
      variables: {
        email: authData.email,
        password: authData.password
      }
    };

    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      });
      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      localStorage.setItem('token', data.data.login.token);
      localStorage.setItem('userId', data.data.login.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());

      return navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (authData: SignUpAuthData) => {
    if (authData.password !== authData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    const graphqlQuery = {
      query: `
        mutation CreateNewUser($email: String!, $name: String!, $password: String!) {
          createUser(userInput: {email: $email, name: $name, password: $password}) {
            _id
            email
          }
        }
      `,
      variables: {
        email: authData.email,
        name: authData.name,
        password: authData.password
      }
    };

    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      });
      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    dispatch(authActions.setIsAuth(false));
    dispatch(favoritesActions.setFavoriteBooks([]));
  };

  if (error) {
    toast.error(error);
  }

  return {
    checkIsAuth,
    getUserData,
    signIn,
    signUp,
    signOut,
    isLoading,
    error
  };
};

export default useAuth;
