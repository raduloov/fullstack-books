import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="w-1/3 mx-auto dark:text-white">
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-2">Create an account</h2>
        <p>Find your next favorite book!</p>
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
          placeholder="Password"
        />
      </div>

      <button className="mt-10 rounded-xl border-2 border-violet-500 dark:border-violet-300 block w-full px-3 py-2 shadow-xl hover:bg-violet-500 dark:hover:bg-violet-300 hover:text-white dark:hover:text-black hover:shadow-md duration-200">
        Create account
      </button>
      <p className="mt-5">
        Already have an account?{' '}
        <Link to="/login" className="text-violet-500 dark:text-violet-300">
          Login here!
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
