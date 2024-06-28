"use client";

import { useRouter } from "next/navigation";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      </button>
    </header>
  );
}

export default Header;
