import { Link } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
}

const UserCard = ({ isLoggedIn }: Props) => {
  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <>
          <div className="rounded-full h-[56px] w-[56px] bg-black mr-6">
            {/* <img src="" alt="" /> */}
          </div>
          <div className="flex flex-col">
            <p className="text-violet-500 text-xl font-semibold">Yavor Radulov</p>
            <p className="text-gray-600">raduloov@gmail.com</p>
          </div>
        </>
      ) : (
        <div className="flex">
          <Link
            to="/login"
            className="rounded-2xl border-2 border-violet-500 dark:border-violet-400 p-3 shadow-xl hover:bg-violet-500 dark:hover:bg-violet-400 hover:text-white dark:hover:text-black hover:shadow-md duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-2xl border-2 border-violet-500 dark:border-violet-400 ml-3 p-3 bg-violet-500 dark:bg-violet-400 shadow-xl hover:bg-violet-600 dark:hover:bg-violet-500 hover:border-violet-600 dark:hover:border-violet-500 text-white dark:text-black hover:shadow-md duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserCard;
