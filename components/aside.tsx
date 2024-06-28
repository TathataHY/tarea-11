const Aside = () => {
  return (
    <aside className="bg-blue-800 text-white h-screen w-48 flex flex-col justify-between">
      <div>
        <a href="#" className="block py-4 px-6 hover:bg-pink-700">
          Home
        </a>
        <a href="#" className="block py-4 px-6 hover:bg-pink-700">
          Products
        </a>
        <a href="#" className="block py-4 px-6 hover:bg-pink-700">
          Services
        </a>
        <a href="#" className="block py-4 px-6 hover:bg-pink-700">
          Contact
        </a>
        <a href="#" className="block py-4 px-6 hover:bg-pink-700">
          Other
        </a>
      </div>
      <div className="flex flex-col items-center p-4">
        <img
          className="w-16 h-16 rounded-full mb-2"
          src={"https://github.com/tathatahy.png"}
          alt="User"
        />
        <h6>User Current: first name</h6>
      </div>
    </aside>
  );
};

export default Aside;
