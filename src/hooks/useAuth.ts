import { authActions } from './../store/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from './useRedux';
import { GRAPHQL_URL } from '../apis/graphql';
import { LoginAuthData, SignUpAuthData } from './../@types/types';

const useAuth = () => {
  // const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const checkIsAuth = (): void | boolean => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    if (!token || !expiryDate) {
      // signOut
      dispatch(authActions.setIsAuth(false));
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      // signOut
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
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      });
      const data = await response.json();

      if (data.errors) {
        throw new Error(`User login failed!`);
      }

      localStorage.setItem('token', data.data.login.token);
      localStorage.setItem('userId', data.data.login.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());

      return navigate('/');
    } catch (err: any) {
      setError(err.message);
      throw err;
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
      setIsLoading(true);

      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      });
      const data = await response.json();

      if (data.errors && data.errors[0].status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (data.errors) {
        throw new Error('User creation failed!');
      }

      return navigate('/');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkIsAuth,
    signIn,
    signUp,
    isLoading,
    error
  };
};

export default useAuth;
