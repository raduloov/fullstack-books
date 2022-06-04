import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SignUpAuthData } from '../../@types/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ActivityIndicator from '../../components/UI/ActivityIndicator';
import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/useRedux';

const SignUpPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { isAuth } = useAppSelector(state => state.auth);

  const { signUp, error, isLoading } = useAuth();

  const signUpHandler = async (event: FormEvent, authData: SignUpAuthData) => {
    event.preventDefault();

    await signUp(authData);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="w-1/3 sm:w-full sm:px-2 mx-auto dark:text-white">
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-2">Create an account</h2>
        <p>Find your next favorite book!</p>
      </div>

      <form
        onSubmit={event =>
          signUpHandler(event, {
            name,
            email,
            password,
            confirmPassword
          })
        }
      >
        <div className="mb-5">
          <label htmlFor="email-address">Name</label>
          <input
            id="name"
            name="name"
            required
            className="appearance-none relative block w-full px-3 py-2 dark:bg-stone-800 border-2 border-gray-300 dark:border-stone-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-xl focus:outline-none focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-300 dark:focus:border-violet-300 focus:z-10"
            placeholder="Full name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email-address">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            className="appearance-none relative block w-full px-3 py-2 dark:bg-stone-800 border-2 border-gray-300 dark:border-stone-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-xl focus:outline-none focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-300 dark:focus:border-violet-300 focus:z-10"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none relative block w-full px-3 py-2 dark:bg-stone-800 border-2 border-gray-300 dark:border-stone-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-xl focus:outline-none focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-300 dark:focus:border-violet-300 focus:z-10"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className="appearance-none relative block w-full px-3 py-2 dark:bg-stone-800 border-2 border-gray-300 dark:border-stone-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-xl focus:outline-none focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-300 dark:focus:border-violet-300 focus:z-10"
            placeholder="Confirm password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <button
          type="submit"
          className="mt-10 rounded-xl border-2 border-violet-500 dark:border-violet-300 block w-full px-3 h-12 shadow-xl hover:bg-violet-500 dark:hover:bg-violet-300 hover:text-white dark:hover:text-black hover:shadow-md duration-200"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size={40} />
          ) : (
            'Create account'
          )}
        </button>
        <p className="mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-500 dark:text-violet-300">
            Login here!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
