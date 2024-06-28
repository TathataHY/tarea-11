"use client";

import { useRouter } from "next/navigation";
import { Icons } from "./icons";

function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Aquí se puede incluir la lógica para cerrar sesión
    // Redirigir al inicio ("/")
    router.push("/");
  };

  return (
    <header className="bg-blue-800 text-white py-4 flex justify-between items-center px-6">
      <h1 className="text-2xl font-bold">Sistema Web con React</h1>
      <button
        onClick={handleLogout}
        className="flex items-center bg-white text-blue-800 rounded-md px-4 py-2 hover:bg-gray-200"
      >
        <Icons.logout className="w-6 h-6 mr-2" /> Logout
      </button>
    </header>
  );
}

export default Header;
