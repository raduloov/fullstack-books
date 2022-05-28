const UserCard = () => {
  return (
    <div className="flex items-center">
      <div className="rounded-full h-[56px] w-[56px] bg-black mr-6">
        {/* <img src="" alt="" /> */}
      </div>
      <div className="flex flex-col">
        <p className="text-violet-500 text-xl font-semibold">Yavor Radulov</p>
        <p className="text-gray-600">raduloov@gmail.com</p>
      </div>
    </div>
  );
};

export default UserCard;
